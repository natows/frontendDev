"use client";
import { useState, useEffect } from "react";
import { getFavorites, removeFavorite, addFavorite } from "../favorites/favorites.js";

export default function PokemonDetails({ pokemon }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(getFavorites());
    }
  }, []);

  function handleFavoritesChange() {
    if (favorites.includes(pokemon.name)) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon.name);
    }

    setFavorites(getFavorites());
  }

  return (
    <main style={{display: "flex", justifyContent:"center", marginTop:"30px"}}>
      <div style={{ display: "flex", flexDirection:"column",alignItems: "center", border: "1px solid #ccc", padding: "20px", borderRadius: "10px", width: "300px" }}>
        <h2>{pokemon.name.toUpperCase()}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: "150px" }} />
        <p>ID: {pokemon.id}</p>
        <button style={{padding:"10px",fontWeight:"bold",color:"#F9629F",border:"solid 1px grey", borderRadius: "20px"}} onClick={handleFavoritesChange}>
          {favorites.includes(pokemon.name) ? "Remove from favorites" : "Add to favorites"}
        </button>
        <div style={{border: "1px solid #ccc", padding: "20px", borderRadius: "10px", marginTop: "10px"}}>
          <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
          <p>Height: {pokemon.height} dm</p>
          <p>Weight: {pokemon.weight} hg</p>
          <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
        </div>
      </div>
    </main>
  );
}