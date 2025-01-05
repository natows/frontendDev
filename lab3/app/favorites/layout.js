export default function FavoritesLayout({ children }) {
  return (
    <div
      style={{
        display: "grid",  
        placeItems: "center",  
        height: "65vh",  
        margin: 0,
      }}
    >
      <div
        style={{
          border: "solid 1px #ccc",  
          borderRadius:"40px",
          textAlign:"center",
          width: "600px",  
          height: "300px",  
          display: "flex",  
          flexDirection: "column",  
          padding: "10px",  
        }}
      >
        <h1 style={{ marginBottom: "10px", textAlign: "center" }}>
          A List of Your Favorite Pokémons :3
        </h1>
        <section style={{ flexGrow: 1, overflowY: "auto" }}>
          {children}
        </section>
      </div>
    </div>
  );
}