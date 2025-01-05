const { useState, useEffect } = React;

function PokemonDetails({ pokemon }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const info = {
          name: data.name,
          picture: data.sprites.front_default,
          stats: data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(', '),
          types: data.types.map((type) => type.type.name).join(', '),
          height: data.height,
          weight: data.weight,
        };
        setDetails(info);
      } catch (err) {
        setError(`Error fetching pokemon details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [pokemon]);

  if (loading) {
    return <div>Loading details for {pokemon.toUpperCase()}...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="detailHolder">
      <h2>{details.name.toUpperCase()}</h2>
      <img
        src={details.picture}
        alt={details.name}
        style={{ width: '250px', height: '250px' }}
      />
      <p>Stats: {details.stats}</p>
      <p>Types: {details.types}</p>
      <p>Height: {details.height}</p>
      <p>Weight: {details.weight}</p>
    </div>
  );
}