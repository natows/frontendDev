//alerty usun i eventlistenery n onclicki
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
        console.error(error);
        throw new error("Error fetching pokemon list", error);
    }
}


async function getPokemonInfo(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    try {
        const response = await fetch(url)
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
        console.log(error)
        throw new error("Error fetching pokemon info", error)
    }
}

async function display20Pokemons() {
    const listHolder = document.getElementById('pokemonList')
    listHolder.innerHTML = '';
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Loading data...';
    listHolder.appendChild(loadingMessage);
    try {
        const list = await getPokemonList(20);
        listHolder.innerHTML = '';


        for (const pokemon of list) {
            const listItem = document.createElement('div') 
            listItem.classList.add('pokemon-item'); 

            const name = document.createElement('div');
            name.textContent = pokemon.name.toUpperCase();

            try { 
                const info = await getPokemonInfo(pokemon.name);

                const number = document.createElement('div');
                number.textContent = `No ${info.number}`; 

                const picture = document.createElement('img')
                picture.src = info.picture


                listItem.appendChild(picture)
                listItem.appendChild(name)
                listItem.appendChild(number)

            }catch (error) {
                console.error(error)
                throw new error("Error fetching pokemon info for displaying", error)
            }
            
            
            listItem.addEventListener('click', () => displayPokemonDetails(pokemon.name));

            listHolder.appendChild(listItem);

        }
    } catch (error) {
        console.error("Error displaying pokemon list", error)
        listHolder.textContent = `Failed loading pokemon list: ${error}`
    }
    
    
}

document.addEventListener('DOMContentLoaded', display20Pokemons());


async function displayPokemonDetails(pokemon) {
    const detailHolder = document.getElementById('pokemonDetails');
    detailHolder.classList.add('detailHolder')
    detailHolder.innerHTML = '';
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Loading data...';
    detailHolder.appendChild(loadingMessage);

    try {
        const details = await getPokemonInfo(pokemon)
        detailHolder.innerHTML = '';

        const name = document.createElement('h2')
        name.textContent = `${details.name.toUpperCase()}`

        const picture = document.createElement('img')
        picture.src = details.picture
        picture.style.width = '250px'
        picture.style.height = '250px'

        const stats = document.createElement('p')
        stats.textContent = `Stats: ${details.stats}`

        const types = document.createElement('p')
        types.textContent = `Types: ${details.types}`

        const height = document.createElement('p')
        height.textContent = `Height: ${details.height}`

        const weight = document.createElement('p')
        weight.textContent = `Weight: ${details.weight}`

        detailHolder.appendChild(name)
        detailHolder.appendChild(picture)
        detailHolder.appendChild(stats)
        detailHolder.appendChild(types)
        detailHolder.appendChild(height)
        detailHolder.appendChild(weight)


    }catch (error) {
        console.log("Error fetching pokemon details")
        detailHolder.textContent = `Error fetching pokemon details: ${error}`
    }

    
}


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pokemonSearch');
    const searchButton = document.getElementById('imageButton');

    searchButton.addEventListener('click', () => {
        const pokemonName = searchInput.value.toLowerCase().trim();
        if (pokemonName) {
            displayPokemonDetails(pokemonName);
        } else {
            alert('Please input pokemon name');
        }
    });
});