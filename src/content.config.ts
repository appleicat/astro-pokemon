import { defineCollection, z } from "astro:content";

const pokemons = defineCollection({
  loader: async () => {
    try {
      const pokemonsResponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10"
      );
      const pokemonsJson = await pokemonsResponse.json();
      const pokemonsMap = pokemonsJson.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonJson = await pokemonResponse.json();
        return pokemonJson;
      });
      const pokemons = await Promise.all(pokemonsMap);

      return pokemons.map((pokemon) => ({
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
