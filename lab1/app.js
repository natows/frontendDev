async function getPokemonList(limit) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.results; 
    } catch (error) {
        console.error("Error fetching list", error);
        throw new Error("Failed to fetch Pokemon list")
    }
}

async function display20Pokemons() {
    const listHolder = document.getElementById('pokemonList');
    listHolder.innerHTML = '';
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Ładowanie danych...';
    listHolder.appendChild(loadingMessage);
    try {
        const list = await getPokemonList(20);

        listHolder.innerHTML = '';

        list.forEach(pokemon => {
            const listItem = document.createElement('div')
            listItem.textContent = pokemon.name.toUpperCase(); 
            listItem.classList.add('pokemon-item');  
            
            listItem.addEventListener('click', () => displayPokemonInfo(pokemon.name));

            listHolder.appendChild(listItem);
        })
    } catch (error) {
        console.error("Error displaying pokemon list")
        listHolder.textContent = `Failed loading pokemon list: ${error}`
    }
    
    
}

document.addEventListener('DOMContentLoaded', display20Pokemons());


async function getPokemonInfo(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const details = {
            name: data.name,
            number: data.id,
            picture: data.sprites.front_default,
            types: data.types.map(type => type.type.name).join(', '),
            stats: data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', '),
            weight: data.weight,
            height: data.height
        }; 
        return details
    } catch (error){
        console.log("Error fetching pokemon info")
        throw new Error("Failed to fetch Pokemon info")

    }
}

async function displayPokemonInfo(pokemon){
    const infoHolder = document.getElementById("pokemonInfo");
    infoHolder.innerHTML = '';

    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Ładowanie danych...';
    infoHolder.appendChild(loadingMessage);

    try {
        const info = await getPokemonInfo(pokemon)

        infoHolder.innerHTML = '';


        const name = document.createElement('h2');
        name.textContent = `${info.name.toUpperCase()}`;

        const number = document.createElement('p');
        number.textContent = `Number: ${info.number}`;

        const picture = document.createElement('img');
        picture.src = info.picture
        picture.style.width = '250px'
        picture.style.height = '250px'

        picture.addEventListener('click', () => {
            displayPokemonDetails(pokemon)
        })


        infoHolder.appendChild(name);
        infoHolder.appendChild(picture);
        infoHolder.appendChild(number);

    } catch (error) {
        console.log("Error displaying pokemon info");
        infoHolder.textContent = `Error displaying pokemon info: ${error}`;
    }
}


async function displayPokemonDetails(pokemon) {
    const detailHolder = document.getElementById('pokemonDetails');
    detailHolder.innerHTML = '';
    
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Ładowanie danych...';
    detailHolder.appendChild(loadingMessage);

    try {
        const details = await getPokemonInfo(pokemon);

        detailHolder.innerHTML = '';

        const stats = document.createElement('p');
        stats.textContent = `Stats: ${details.stats}`;

        const types = document.createElement('p');
        types.textContent = `Types: ${details.types}`;

        const height = document.createElement('p');
        height.textContent = `Height: ${details.height}`;

        const weight = document.createElement('p');
        weight.textContent = `Weight: ${details.weight}`;

        detailHolder.appendChild(stats);
        detailHolder.appendChild(types);
        detailHolder.appendChild(height);
        detailHolder.appendChild(weight);


    }catch (error) {
        console.log("Error fetching pokemon details");
        detailHolder.textContent = `Error displaying pokemon details: ${error}`;
    }

    
}

