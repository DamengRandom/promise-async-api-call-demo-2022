import nodeFetch from "node-fetch";

export interface PokemonResult {
  name: string;
  url: string;
};

const endpoint = "https://pokeapi.co/api/v2/pokemon";

const getPokemons = async (): Promise<PokemonResult[]> => {
  const listResponse = await nodeFetch(endpoint); // calling pokemon api: https://pokeapi.co/api/v2/pokemon
  const listResponseJson = await listResponse.json();
  const { results } = await listResponseJson;

  return results;
}

export default getPokemons;
