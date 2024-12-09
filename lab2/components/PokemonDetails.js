const PokemonDetails = ({ pokemon }) => {
    return React.createElement('div', { className: 'pokemon-details' },
        React.createElement('h2', null, pokemon.name.toUpperCase()),
        React.createElement('img', {
            src: pokemon.picture,
            alt: pokemon.name,
            style: { width: '250px', height: '250px' }
        }),
        React.createElement('p', null, `Types: ${pokemon.types}`),
        React.createElement('p', null, `Stats: ${pokemon.stats}`),
        React.createElement('p', null, `Height: ${pokemon.height}`),
        React.createElement('p', null, `Weight: ${pokemon.weight}`)
    );
};