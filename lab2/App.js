const { useState, useEffect } = React;

function App() {
  const [pokemonName, setPokemonName] = useState(''); 
  const [selectedPokemon, setSelectedPokemon] = useState(null); 

  const handleSearch = () => {
    if (pokemonName.trim()) {
      setSelectedPokemon(pokemonName.toLowerCase()); 
      const detailsDiv = document.getElementById('pokemonDetails');
      ReactDOM.createRoot(detailsDiv).render(<PokemonDetails pokemon={pokemonName} />);
    } 
    // else {
    //   alert('Proszę wpisać nazwę pokemona!');
    // }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Pokemon name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <PokemonList onSelect={(name) => setSelectedPokemon(name)} />
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);