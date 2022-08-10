import nodeFetch from "node-fetch";

interface PokemonResultStat {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

interface PokemonResultStats {
  stats: PokemonResultStat[]
}

const getPokemonResultStats = async (url: string): Promise<PokemonResultStats> => { // another version with Promise !!
  return new Promise(async (resolve, reject) => {
    try {
      const resultResponse = await nodeFetch(url);
      resolve(await resultResponse.json());
    } catch (error) {
      reject({ message: `Error of fetching pokemon results: ${(error as unknown as { message: string })?.message}`});
    }
  });
};

export default getPokemonResultStats;
