const PokemonList = ({ pokemonList, onPokemonClick }) => {
    return React.createElement('div', { className: 'pokemon-list' },
        pokemonList.map(pokemon =>
            React.createElement('div', {
                key: pokemon.name,
                className: 'pokemon-item',
                onClick: () => onPokemonClick(pokemon.name)
            },
            React.createElement('img', {
                src: pokemonDetails[pokemon.name].picture,
                alt: pokemon.name,
                style: { width: '50px', height: '50px', marginRight: '10px' }
            }),
            React.createElement('span', null, pokemon.name.toUpperCase()),
            React.createElement('span', null, `#${pokemonDetails[pokemon.name].number}`)

            )
        )
    );
};