let input = document.querySelector('.input');
let button = document.querySelector('.button');
let display = document.querySelector('#display');
let pokemonPicture = document.querySelector('#pokemon_picture');
let pokemonData = document.querySelector('#pokemon_data');

async function getPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let res = await fetch(url);
    let pokemon = await res.json(url);

    let pokemonName = pokemon['name'];
    let pokemonImage = pokemon['sprites']['front_default'];
};

button.addEventListener("click", () => {
    
});