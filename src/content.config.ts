import { defineCollection, z } from "astro:content";
import axios from "axios";
import * as cheerio from "cheerio";

const pokemons = defineCollection({
  loader: async () => {
    try {
      const pokemonsCount = await axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((response) => response.data.count);

      const pokemons = [];
      while (pokemons.length < 10) {
        try {
          const pokemonId = Math.floor(Math.random() * pokemonsCount + 1);
          if (!pokemons.find((pokemon) => pokemon.id === pokemonId)) {
            const pokemon = await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
              .then((response) => response.data);
            pokemons.push(pokemon);
          }
        } catch (error) {}
      }

      const pokemonsDataWithEpisodes = pokemons.map(async (pokemon) => {
        const episodes = await axios
          .get(
            `https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pok%C3%A9mon)`
          )
          .then(
            (res) =>
              cheerio
                .load(res.data)("span#In_animation")
                .closest("h2")
                .nextUntil("h2", "p").length
          )
          .catch(() => 0);
        return { ...pokemon, episodes };
      });

      const data = await Promise.all(pokemonsDataWithEpisodes);

      return data.map((pokemon) => ({
        id: String(pokemon.id),
        name: pokemon.name,
        image: pokemon.sprites.front_shiny,
        height: pokemon.height,
        attack: pokemon.stats.find((s) => s.stat.name === "attack").base_stat,
        episodes: pokemon.episodes,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().url(),
    height: z.number(),
    attack: z.number(),
    episodes: z.number(),
  }),
});

export const collections = { pokemons };
