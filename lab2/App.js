let pokemonList = [];
let pokemonDetails = {};
let selectedPokemon = null;



async function getPokemonList(limit) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data.results;
}

async function getPokemonInfo(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return {
        name: data.name,
        number: data.id,
        picture: data.sprites.front_default,
        types: data.types.map(type => type.type.name).join(', '),
        stats: data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', '),
        weight: data.weight,
        height: data.height,
    };
}

//komponent app
const App = () => {
    const fetchData = async () => {
        const loadingDiv= document.getElementById('loadingerror')
        loadingDiv.textContent = "Loading...";
        document.body.appendChild(loadingDiv); 
        try {
            pokemonList = await getPokemonList(20);
            pokemonDetails = {};

            for (let pokemon of pokemonList) {
                try{
                    const details = await getPokemonInfo(pokemon.name);
                    pokemonDetails[pokemon.name] = details;
                }catch (err) {
                    error = "Failed to load Pokemon details";
                    console.log(err)
                }

                
            }
        } catch (err) {
            error = "Failed to load Pokemon list";
            console.log(err)
        } finally {
            document.body.removeChild(loadingDiv); 
            render();
            
        }
    };

    fetchData()
    
    const handleSearch = async () => {
        const pokemonName = document.getElementById('search').value.trim().toLowerCase();
    
        const loadingDiv = document.createElement('div');
        loadingDiv.textContent = "Loading...";
        document.getElementById('pokemonDetails').appendChild(loadingDiv);
    
        try {
            const details = await getPokemonInfo(pokemonName);
            document.getElementById('pokemonDetails').removeChild(loadingDiv);
            const detailsContainer = document.getElementById('pokemonDetails');
            ReactDOM.render(
                React.createElement(PokemonDetails, { pokemon: details }),
                detailsContainer
            );
        } catch (error) {
            document.getElementById('pokemonDetails').removeChild(loadingDiv);
            const detailsContainer = document.getElementById('pokemonDetails');
            detailsContainer.textContent = "Pokemon not found!";
        }
    };
    const handlePokemonClick = (pokemonName) => {
        selectedPokemon = pokemonName;
        const pokemon = pokemonDetails[pokemonName];
        const detailsContainer = document.getElementById('pokemonDetails');
        ReactDOM.render(React.createElement(PokemonDetails, { pokemon }), detailsContainer);
    };



    return React.createElement('div', { className: 'pokemon-list' },
        React.createElement('div', { className: 'search' },
            React.createElement('input', { id: 'search', placeholder: 'Wpisz nazwe pokemona' }),
            React.createElement('button', { id: 'button', onClick: handleSearch }, 'Szukaj'),
        React.createElement(PokemonList, {
            pokemonList: pokemonList,
            onPokemonClick: handlePokemonClick
        }),
        

    ));
};


const root = ReactDOM.createRoot(document.getElementById('root'));
const render = () => {
    root.render(React.createElement(App));
};




render();


