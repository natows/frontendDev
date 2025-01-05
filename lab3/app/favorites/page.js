"use client";
import { getFavorites, removeFavorite } from "./favorites.js";

import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  if (favorites.length > 0) {
    return (
      <ul>
        {favorites.map((pokemon) => (
          <li key={pokemon} >
            <a href={`/pokemon/${pokemon}`}>{pokemon}</a>
            <button onClick={() => removeFavorite(pokemon)}>Remove from favorites</button>
          </li>
        ))}
      </ul>
    );
  }else{
    return <p>You don&apos;t have any Pokemons added yet</p>;
  };
};