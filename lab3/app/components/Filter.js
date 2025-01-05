"use client";

export default function Filter({ types, limit }) {
  function handleFilterChange(event) {
    const params = new URLSearchParams(window.location.search);
    params.set(event.target.name, event.target.value);
    window.location.href = `?${params}`;
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleFilterChange(event);
    }
  }

  return (
    <nav style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px", gap: "20px"}}>
      <input
        type="text"
        name="search"
        placeholder="Search Pokemon"
        defaultValue={new URLSearchParams(window.location.search).get("search") || ""}
        onKeyDown={handleKeyDown}
      />
      <select
        name="type"
        defaultValue={new URLSearchParams(window.location.search).get("type") || ""}
        onChange={handleFilterChange}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
      <input id="number"
        type="number"
        name="limit"
        placeholder="Liczba wyświetlanych Pokemonów"
        min="1"
        max={limit}
        defaultValue={new URLSearchParams(window.location.search).get("limit") || "20"}
        onKeyDown={handleKeyDown}
      />
    </nav>
  );
}