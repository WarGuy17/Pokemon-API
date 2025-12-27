const input = document.querySelector('.input');
const button = document.querySelector('.button');
const button2 = document.querySelector('.button2')
const pName = document.querySelector('#pokemon_name');
const sprite = document.querySelector('#pokemonPicture');
const type = document.querySelector('#pokemon_type');
const health = document.querySelector('#pokemon_hp');
const attack = document.querySelector('#pokemon_attack');
const defense = document.querySelector('#pokemon_defense');

async function getPokemon(){
    
    const name = input.value.trim();//sets a variable to the input value of the search bar.

    let url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;// sets a variable to the api with name being an input by user.
    let res = await fetch(url);

    if(!res.ok){
        throw new Error("No Pokemon found");
        return; //checks to see if response comes back successful
    };

    let pokemon = await res.json();//turns response into an object that can be used

    let pokemonName = pokemon.name;//sets a variable to inside the response called "name"
    let pokemonPicture = pokemon.sprites.front_default;// sets a variable to inside the response called "sprites" "front_default"
    let pokemonType = (pokemon.types[0].type.name && pokemon.types[1].type.name);//sets a variable to inside the response called "types"
    let pokemonHealth = pokemon.stats[0].base_stat;
    let pokemonAttack = pokemon.stats[1].base_stat;
    let pokemonDefense = pokemon.stats[2].base_stat;//sets a variable to inside the response called "stats[0]" which is health
    return {pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense};

};

async function randomPokemon(){

    let random = Math.floor(Math.random() * 1350);
    let url = `https://pokeapi.co/api/v2/pokemon/${random}`;

    let res = await fetch(url);

    let pokemon = await res.json();

    let pokemonName = pokemon.name;
    let pokemonPicture = pokemon.sprites.front_default;
    let pokemonType = pokemon.types[0].type.name;
    let pokemonHealth = pokemon.stats[0].base_stat;
    let pokemonAttack = pokemon.stats[1].base_stat;
    let pokemonDefense = pokemon.stats[2].base_stat;
    return {pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense};

};

button.addEventListener("click", async () => {
    const name = input.value.trim();
    
    if(!name){
        console.log('no text in searchbar');
        return;
    }
    
    try { const {
    pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense} = await getPokemon();
    pName.textContent = 'name: ' + pokemonName;
    sprite.src = pokemonPicture;
    type.textContent = 'type: ' + pokemonType;
    health.textContent = 'health: ' + pokemonHealth;
    attack.textContent = 'attack: ' + pokemonAttack;
    defense.textContent = 'defense: ' + pokemonDefense;}
    catch (error) {
        pName.textContent = error.message;
        sprite.src = '';
        type.textContent = '';
        health.textContent = '';
        attack.textContent = '';
        defense.textContent = '';
    }

    if(pokemonType === true) {
        console.log('electric');
    }
});

button2.addEventListener("click", async () => {
    const {pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense} = await randomPokemon();
    pName.textContent = 'name: ' + pokemonName;
    sprite.src = pokemonPicture;
    type.textContent = 'type: ' + pokemonType;
    health.textContent = 'health: ' + pokemonHealth;
    attack.textContent = 'attack: ' + pokemonAttack;
    defense.textContent = 'defense: ' + pokemonDefense;
    input.value = '';
});
