import { defineCollection, z } from "astro:content";
import axios from "axios";

const pokemons = defineCollection({
  loader: async () => {
    try {
      const pokemons = await axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then((response) => response.data);

      const pokemonsInfo = pokemons.results.map(
        async (pokemon) =>
          await axios.get(pokemon.url).then((response) => response.data)
      );

      const data = await Promise.all(pokemonsInfo);

      return data.map((pokemon) => ({
        id: String(pokemon.id),
        name: pokemon.name,
        image: pokemon.sprites.front_shiny,
        height: pokemon.height,
        attack: pokemon.stats.find((s) => s.stat.name === "attack").base_stat,
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
  }),
});

export const collections = { pokemons };
