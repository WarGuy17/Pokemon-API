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
const pokemonName = document.querySelector('#pokemonName2');
const typeBadge = document.createElement('img')
typeBadge.classList.add('type_badge');
display.appendChild(typeBadge);

let offset = 0;
const limit = 50;

//Below is the Function to load Pokemon into a scrollable list.

async function loadPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    console.log(data.results);

    data.results.forEach(pokemon => {//iterates through the results and does a function to each object.
        displayPokemon(pokemon);
    });

    updateTypeBadge(data);

    offset += 50;
}

//below is the Function to display the Pokemon inside that list it is used in the above function

async function displayPokemon(pokemon) {
    const list = document.getElementById('pokemon_list');//grabs the list

    const res = await fetch(pokemon.url);//need to reload api url to access sprites
    const data = await res.json();

    //Below is just adding elements using the DOM for each iteration and appending them to a parent.

    const item = document.createElement('div');
    item.classList.add('pokemon-item');

    const img = document.createElement('img');
    img.src = data.sprites.front_default;
    img.alt = pokemon.name;

    const name = document.createElement('span');
    name.textContent = pokemon.name;
    const pokemonHealth = data.stats[0].base_stat;
    const pokemonAttack = data.stats[1].base_stat;
    const pokemonDefense = data.stats[2].base_stat;
    const typeOfPokemon = data.types.map(t => t.type.name);

    item.appendChild(img);
    item.appendChild(name);

    list.appendChild(item);

    item.addEventListener('click', ()=> {
        sprite.src = img.src;
        pName.textContent = `name: ${name.textContent}`;
        type.textContent = `type: ${typeOfPokemon}`
        health.textContent = `health: ${pokemonHealth}`;
        attack.textContent = `attack: ${pokemonAttack}`;
        defense.textContent = `defense: ${pokemonDefense}`;

    })
}

function updateTypeBadge(pokemon) {
    console.log(pokemon.types[0]);
    if(!pokemon || !pokemon.types[0].type.name) console.log('oops');

    typeBadge.src = `./media/${pokemon.types[0].type.name}.png`;
}



//this function checks to see the user input in the search bar and returns a result.

async function getPokemon(){
    
    const name = input.value.trim();//sets a variable to the input value of the search bar.

    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;// sets a variable to the api with name being an input by user.
    const response = await fetch(url);

    if(!response.ok){
        input.value = '';
        throw new Error("No Pokemon found"); //checks to see if response comes back successful
    };

    const pokemon = await response.json();//turns response into an object that can be used

    updateTypeBadge(pokemon);

    const pokemonName = pokemon.name;//sets a variable to inside the response called "name"
    const pokemonPicture = pokemon.sprites.front_default;// sets a variable to inside the response called "sprites" "front_default"
    const pokemonType = pokemon.types.map(t => t.type.name);//sets a variable to inside the response called "types"
    const pokemonHealth = pokemon.stats[0].base_stat;
    const pokemonAttack = pokemon.stats[1].base_stat;
    const pokemonDefense = pokemon.stats[2].base_stat;//sets a variable to inside the response called "stats[0]" which is health

    return {pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense}


};

//This function returns a randomPokemon

async function randomPokemon(){

    const random = Math.floor(Math.random() * 1000);
    const url = `https://pokeapi.co/api/v2/pokemon/${random}`;

    const res = await fetch(url);

    const pokemon = await res.json();

    updateTypeBadge(pokemon);

    const pokemonName = pokemon.name;
    const pokemonPicture = pokemon.sprites.front_default;
    const pokemonType = pokemon.types[0].type.name;
    const pokemonHealth = pokemon.stats[0].base_stat;
    const pokemonAttack = pokemon.stats[1].base_stat;
    const pokemonDefense = pokemon.stats[2].base_stat;
    return {pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense};

};

//This Event listener is for fetching the pokemon based off the input in the search bar

button.addEventListener("click", async () => {
    const name = input.value.trim();

    if(!name){
        throw new Error('Please type in pokemon name or number.');
    }
    
    try { const {pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense} = await getPokemon();
    
    pName.textContent = 'name: ' + pokemonName;
    sprite.src = pokemonPicture;
    type.textContent = 'type: ' + pokemonType.join(', ');
    health.textContent = 'health: ' + pokemonHealth;
    attack.textContent = 'attack: ' + pokemonAttack;
    defense.textContent = 'defense: ' + pokemonDefense;
    display.style.backgroundImage = '';

    typeFinder(pokemonType);

    }

    catch (error) {
        pName.textContent = error.message;
        sprite.src = '';
        type.textContent = '';
        health.textContent = '';
        attack.textContent = '';
        defense.textContent = '';
    }

});

//this Event listener is attached to the randomPokemon button.

button2.addEventListener("click", async () => {
    
    const {pokemonName, pokemonPicture, pokemonType, pokemonHealth, pokemonAttack, pokemonDefense} = await randomPokemon();

    pName.textContent = 'name: ' + pokemonName;
    sprite.src = pokemonPicture;
    type.textContent = 'type: ' + pokemonType;
    health.textContent = 'health: ' + pokemonHealth;
    attack.textContent = 'attack: ' + pokemonAttack;
    defense.textContent = 'defense: ' + pokemonDefense;
    input.value = '';

    display.classList.add('fade-in');

});

display.addEventListener('animationend', () => {
    display.classList.remove('fade-in');
})

document.addEventListener("DOMContentLoaded", () => {
    loadPokemon();
})
