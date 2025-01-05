import Navigation from "./components/Navigation";
import './globals.css';

export const metadata = {
  title: "Pokemon Finder",
  description: "Wyszukiwarka Pokemonów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Pokemon Finder</title>
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}

