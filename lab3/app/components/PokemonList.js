import Image from 'next/image';
export default function PokemonList({ pokemons }) {
  return (
    <ul style={{ listStyle: "none", padding: 50, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "40px" }}>
      {pokemons.map((pokemon) => (
        <li key={pokemon.name} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
          <a href={`/pokemon/${pokemon.name}`} style={{ textDecoration: "none", color: "black" }}>
            <h3>{pokemon.name.toUpperCase()}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: "100px", height: "100px" }} />
            <p>ID: {pokemon.id}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}