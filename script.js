const input = document.querySelector('.input');
const button = document.querySelector('.button');
const button2 = document.querySelector('.button2')
const pName = document.querySelector('#pokemon_name');
const sprite = document.querySelector('#pokemonPicture');
const type = document.querySelector('#pokemon_type');
const health = document.querySelector('#pokemon_hp');
const attack = document.querySelector('#pokemon_attack');
const defense = document.querySelector('#pokemon_defense');
const display = document.querySelector('#display');

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
    let pokemonType = pokemon.types.map(t => t.type.name);//sets a variable to inside the response called "types"
    let pokemonHealth = pokemon.stats[0].base_stat;
    let pokemonAttack = pokemon.stats[1].base_stat;
    let pokemonDefense = pokemon.stats[2].base_stat;//sets a variable to inside the response called "stats[0]" which is health
    return {pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense};

};

async function randomPokemon(){

    let random = Math.floor(Math.random() * 1000);
    let url = `https://pokeapi.co/api/v2/pokemon/${random}`;

    console.log(random);

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
    let pokemonType;

    if(!name){
        console.log('no text in searchbar');
        return;
    }
    
    try { const {
    pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense} = await getPokemon();
    pName.textContent = 'name: ' + pokemonName;
    sprite.src = pokemonPicture;
    type.textContent = 'type: ' + pokemonType.join(', ');
    health.textContent = 'health: ' + pokemonHealth;
    attack.textContent = 'attack: ' + pokemonAttack;
    defense.textContent = 'defense: ' + pokemonDefense;
    display.style.backgroundImage = '';
}

    catch (error) {
        pName.textContent = error.message;
        sprite.src = '';
        type.textContent = '';
        health.textContent = '';
        attack.textContent = '';
        defense.textContent = '';
    }

    if(type.textContent === 'type: electric'){
        display.style.backgroundImage = 'url(https://static.vecteezy.com/system/resources/previews/041/022/502/non_2x/lightning-bolts-seamless-pattern-yellow-and-black-repeating-background-vector.jpg)';
    }
    else if(type.textContent === 'type: grass'){
        display.style.backgroundImage = 'url(https://img.freepik.com/premium-vector/green-leaves-pattern-green-background-vector-illustration_148006-1456.jpg?semt=ais_hybrid)';
    }
    else if(type.textContent === 'type: fire'){
        display.style.backgroundImage = 'url(https://img.freepik.com/premium-vector/cartoon-fire-seamless-background_603333-248.jpg?w=740)';
        display.style.color = 'white';
    }
    else if(type.textContent === 'type: water'){
        display.style.backgroundImage = 'url(https://img.freepik.com/premium-vector/water-background_909058-3482.jpg)';
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
    display.style.backgroundImage = '';

    if(type.textContent === 'type: electric'){
        display.style.backgroundImage = 'url(https://static.vecteezy.com/system/resources/previews/041/022/502/non_2x/lightning-bolts-seamless-pattern-yellow-and-black-repeating-background-vector.jpg)';
    }
    else if(type.textContent === 'type: grass'){
        display.style.backgroundImage = 'url(https://img.freepik.com/premium-vector/green-leaves-pattern-green-background-vector-illustration_148006-1456.jpg?semt=ais_hybrid)';
    }
    else if(type.textContent === 'type: fire'){
        display.style.backgroundImage = 'url(https://img.freepik.com/premium-vector/cartoon-fire-seamless-background_603333-248.jpg?w=740)';
    }
    else if(type.textContent === 'type: water'){
        display.style.backgroundImage = 'url(https://img.freepik.com/premium-vector/water-background_909058-3482.jpg)';
    }
    else if(type.textContent === 'type: poison'){
        display.style.backgroundImage = 'url(https://img.freepik.com/premium-vector/green-seamless-pattern-with-green-halloween-skull_197792-8306.jpg)';
    }
});
