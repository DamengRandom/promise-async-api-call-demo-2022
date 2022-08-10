import getPokemons from "./getPokemons";

describe('Test getPokemons', () => {
  it('should get a list of pokemons', () => {
    getPokemons().then((results) => {
      expect(results).toBeDefined();
    })
  });

  it('should get a pokemon name', (done) => {
    getPokemons().then((results) => {
      console.log("add done() to resolve the error for this console log, Cannot log after tests are done. Did you forget to wait for something async in your test?");
      // "The reason why we need to add done() is because we have a promise need to run!!";
      expect(results[0].name).toBe('bulbasaur');
      done();
    })
  });

  it('should get a pokemon url', async () => {
    const results = await getPokemons();
    const urlResult = "https://pokeapi.co/api/v2/pokemon/1/";
    console.log("Using async await syntax, you don't have to add done()");

    const firstresult = results[0];
    console.log(firstresult);
    
    expect(firstresult.url).toEqual(urlResult);
  });
});
