function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const PokemonData = [
    {
        name: 'Pikachu',
        image: '/pokemon/pikachu.png'
    },
    {
        name: 'Bulbasaur',
        image: '/pokemon/bulbasaur.png'
    },
    {
        name: 'Charmander',
        image: '/pokemon/charmander.png'
    },
    {
        name: 'Squirtle',
        image: '/pokemon/squirtle.png'
    }
];

export async function fetchPokemon(name) {
    return new Promise(async resolve => {
        await timeout(500);
        resolve(PokemonData.find(pokemon => pokemon.name === name));
    });
}
