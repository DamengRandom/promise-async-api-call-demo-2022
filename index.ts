// import nodeFetch from "node-fetch";
import getPokemons from "./src/getPokemons";
import getPokemonResultStats from './src/getPokemonResultStats';

// interface PokemonResult {
//   name: string;
//   url: string;
// };

// interface PokemonList {
//   count: number;
//   next: string;
//   previous?: any;
//   results: PokemonResult[];
// }

// interface PokemonResultStat {
//   base_stat: number,
//   effort: number,
//   stat: {
//     name: string,
//     url: string
//   }
// }

// interface PokemonResultStats {
//   stats: PokemonResultStat[]
// }

// Promise version, using `.then()`, which requires to write catch function after each request 😶😶😶😶

// nodeFetch("https://pokeapi.co/api/v2/pokemon1") // calling pokemon api: https://pokeapi.co/api/v2/pokemon
//   .then(res => res.json())
//   .then((data: PokemonList) => {
//     for (let result of data.results) {
//       nodeFetch(result.url)
//         .then(res => res.json())
//         .then(data => console.log(`Result: ${JSON.stringify(data.stats, null, 2)}`))
//         .catch(error => {
//           console.error('Error of fetching pokemon results: ', error?.message); // have to put each layer fetch, because we are using promise .then(), thus, we have to put catch in each layer
//         });
//     }
//   })
//   .catch(error => {
//     console.error('Error of fetching pokemon: ', error?.message);
//   });



// async await version: only write one try catch, done the catch error job 🤗🤗🤗🤗 
// (async function() {
//   try {
//     const listResponse = await nodeFetch("https://pokeapi.co/api/v2/pokemon"); // calling pokemon api: https://pokeapi.co/api/v2/pokemon
//     const listResponseJson = await listResponse.json();
//     const { results } = await listResponseJson;
  
//     for (let result of results) {
//       const resultResponse = await nodeFetch(result.url);
//       // const resultResponse = await nodeFetch(result.urls); // assume you put some error for this API call, try catch will catch it, no need to write catch logic in each layer, just one layer is good enough ~~
//       const resultResponseJson = await resultResponse.json();
//       console.log(`Result: ${JSON.stringify(resultResponseJson.stats, null, 2)}`);
//     }  
//   } catch (error) {
//     console.error('Error of fetching pokemon & results: ', (error as unknown as { message: string })?.message);
//   }  
// })();


// async await better version (refactor version) 🥐🥐🥐🥐
// const getPokemons = async (): Promise<PokemonResult[]> => {
//   const listResponse = await nodeFetch("https://pokeapi.co/api/v2/pokemon"); // calling pokemon api: https://pokeapi.co/api/v2/pokemon
//   const listResponseJson = await listResponse.json();
//   const { results } = await listResponseJson;

//   return results;
// }

// const getPokemonResultStats = async (url: string): Promise<PokemonResultStats> => {
//   const resultResponse = await nodeFetch(url);

//   return await resultResponse.json();
// }

// const getPokemonResultStats = async (url: string): Promise<PokemonResultStats> => { // another version with Promise !!
//   return new Promise(async (resolve, reject) => {
//     try {
//       const resultResponse = await nodeFetch(url);
//       resolve(await resultResponse.json());
//     } catch (error) {
//       reject({ message: `Error of fetching pokemon results: ${(error as unknown as { message: string })?.message}`});
//     }
//   });
// };

(async function() {
  try {
    const results = await getPokemons();
    // for loop is compatiable with async await ~~
    for (let result of results) { // please DO NOT use results.forEach() here, will crash the app, cannot simutanously handle such a big amount of tasks ...
      const resultResponseJson = await getPokemonResultStats(result.url);

      console.log(`Result: ${JSON.stringify(resultResponseJson.stats, null, 2)}`);
    }  
  } catch (error) {
    console.error('Error of fetching pokemon & results: ', (error as unknown as { message: string })?.message);
  }  
})();
