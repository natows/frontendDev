
export default function Navigation() {
    return (
      <nav>
        <div id="title">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1200px-International_Pokémon_logo.svg.png" style={{width:"200px"}}/>
          <h1>Finder</h1>
        </div>
        <div id="center">
          <a href="/">Main Page</a>
          <a href="/pokemon">Pokemon List</a>
          <a href="/favorites">Favorites</a>
        </div>
      </nav>
    );
}