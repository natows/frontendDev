const { useState, useEffect } = React;


function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPokemonList(data.results);
      } catch (err) {
        setError(`Error fetching pokemon list: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonList();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function displayPokemonDetails(pokemonName) {
    const detailsDiv = document.getElementById('pokemonDetails');
    ReactDOM.createRoot(detailsDiv).render(<PokemonDetails pokemon={pokemonName} />);
  }

  return (
    <div>
      <div id="pokemonList">
        {pokemonList.map((pokemon) => (
          <PokemonItem
            key={pokemon.name}
            name={pokemon.name}
            onClick={() => displayPokemonDetails(pokemon.name)}
          />
        ))}
      </div>
    </div>
  );
}


function PokemonItem({ name, onClick }) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonInfo() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const info = {
          name: data.name,
          number: data.id,
          picture: data.sprites.front_default,
        };
        setDetails(info);
      } catch (err) {
        setError(`Error fetching pokemon info: ${err.message}`);
      }
    }

    fetchPokemonInfo();
  }, [name]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!details) {
    return <div>Loading {name.toUpperCase()}...</div>;
  }

  return (
    <div className="pokemon-item" onClick={onClick}>
      <img src={details.picture} alt={details.name} />
      <div>{details.name.toUpperCase()}</div>
      <div>No {details.number}</div>
    </div>
  );
}