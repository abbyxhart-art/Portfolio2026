import { useState } from "react";

const artworks = [
  { title: "The Starry Night", artist: "Van Gogh", year: "1889", href: "https://www.moma.org/collection/works/79802", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/600px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" },
  { title: "Les Demoiselles d'Avignon", artist: "Picasso", year: "1907", href: "https://www.moma.org/collection/works/79766", img: "https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg" },
  { title: "The Persistence of Memory", artist: "Dalí", year: "1931", href: "https://www.moma.org/collection/works/79018", img: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg" },
  { title: "Christina's World", artist: "Wyeth", year: "1948", href: "https://www.moma.org/collection/works/78455", img: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Wyeth_christinasworld.jpg/600px-Wyeth_christinasworld.jpg" },
  { title: "Broadway Boogie Woogie", artist: "Mondrian", year: "1942–43", href: "https://www.moma.org/collection/works/78737", img: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Piet_Mondriaan%2C_1942_-_Broadway_Boogie-Woogie.jpg/600px-Piet_Mondriaan%2C_1942_-_Broadway_Boogie-Woogie.jpg" },
  { title: "Campbell's Soup Cans", artist: "Warhol", year: "1962", href: "https://www.moma.org/collection/works/79809", img: "https://upload.wikimedia.org/wikipedia/en/d/d3/Campbell%27s_Soup_Cans_MOMA.jpg" },
  { title: "The Sleeping Gypsy", artist: "Rousseau", year: "1897", href: "https://www.moma.org/collection/works/80172", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Henri_Rousseau_-_The_Sleeping_Gypsy_-_Google_Art_Project.jpg/600px-Henri_Rousseau_-_The_Sleeping_Gypsy_-_Google_Art_Project.jpg" },
  { title: "The Song of Love", artist: "de Chirico", year: "1914", href: "https://www.moma.org/collection/works/79195", img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/De_Chirico%2C_The_Song_of_Love.jpg/600px-De_Chirico%2C_The_Song_of_Love.jpg" },
  { title: "I and the Village", artist: "Chagall", year: "1911", href: "https://www.moma.org/collection/works/79149", img: "https://upload.wikimedia.org/wikipedia/en/e/e8/Marc_Chagall%2C_1911%2C_I_and_the_Village%2C_oil_on_canvas%2C_192.1_x_151.4_cm%2C_Museum_of_Modern_Art%2C_New_York.jpg" },
  { title: "Dance (I)", artist: "Matisse", year: "1909", href: "https://www.moma.org/collection/works/79124", img: "https://upload.wikimedia.org/wikipedia/en/a/a7/La_danse_%28I%29_by_Henri_Matisse.jpg" },
  { title: "The Red Studio", artist: "Matisse", year: "1911", href: "https://www.moma.org/collection/works/78389", img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Matisse_-_The_Red_Studio.jpg/600px-Matisse_-_The_Red_Studio.jpg" },
  { title: "The Bather", artist: "Cézanne", year: "c. 1885", href: "https://www.moma.org/collection/works/79057", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paul_C%C3%A9zanne_-_The_Bather_-_Google_Art_Project.jpg/400px-Paul_C%C3%A9zanne_-_The_Bather_-_Google_Art_Project.jpg" },
  { title: "Hina Tefatou (The Moon and the Earth)", artist: "Gauguin", year: "1893", href: "https://www.moma.org/collection/works/79503", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Paul_Gauguin_-_Hina_Tefatou.jpg/400px-Paul_Gauguin_-_Hina_Tefatou.jpg" },
  { title: "Twittering Machine", artist: "Klee", year: "1922", href: "https://www.moma.org/collection/works/37690", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Twittering_Machine_Klee.jpg/400px-Twittering_Machine_Klee.jpg" },
  { title: "Three Women", artist: "Léger", year: "1921", href: "https://www.moma.org/collection/works/79300", img: "https://upload.wikimedia.org/wikipedia/en/0/00/Fernand_L%C3%A9ger_-_Three_Women_-_Le_Grand_D%C3%A9jeuner.jpg" },
  { title: "Gas", artist: "Hopper", year: "1940", href: "https://www.moma.org/collection/works/78248", img: "https://upload.wikimedia.org/wikipedia/en/e/ed/Edward_Hopper_Gas_1940.jpg" },
  { title: "Self-Portrait with Cropped Hair", artist: "Kahlo", year: "1940", href: "https://www.moma.org/collection/works/2640", img: "https://upload.wikimedia.org/wikipedia/en/2/2c/Frida_Kahlo%2C_1940%2C_Self-Portrait_with_Cropped_Hair.jpg" },
  { title: "Les Amants (The Lovers)", artist: "Magritte", year: "1928", href: "https://www.moma.org/collection/works/79933", img: "https://upload.wikimedia.org/wikipedia/en/c/c9/Rene_Magritte_-_Les_Amants_-_1928.jpg" },
  { title: "The Hunter (Catalan Landscape)", artist: "Miró", year: "1923–24", href: "https://www.moma.org/collection/works/79072", img: "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Miro_The_Hunter_%28Catalan_Landscape%29_1923-24.jpg/600px-Miro_The_Hunter_%28Catalan_Landscape%29_1923-24.jpg" },
  { title: "Portrait of Joseph Roulin", artist: "Van Gogh", year: "1889", href: "https://www.moma.org/collection/works/79720", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vincent_van_Gogh_-_Portrait_of_the_Postman_Joseph_Roulin_-_Google_Art_Project_%28454045%29.jpg/400px-Vincent_van_Gogh_-_Portrait_of_the_Postman_Joseph_Roulin_-_Google_Art_Project_%28454045%29.jpg" },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

export default function MomaCard() {
  const artwork = artworks[getDayOfYear() % artworks.length];
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={artwork.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: 8,
        overflow: "hidden",
        background: "#1a1920",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {/* Artwork image */}
      <img
        src={artwork.img}
        alt={artwork.title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: hovered
          ? "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.75) 100%)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.65) 100%)",
        transition: "background 0.2s ease",
      }} />

      {/* Label */}
      <div style={{
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
      }}>
        <p style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 11,
          fontWeight: 300,
          color: "#f2f2f6",
          lineHeight: 1.3,
          textShadow: "0 1px 4px rgba(0,0,0,0.7)",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: hovered ? 2 : 1,
          WebkitBoxOrient: "vertical",
          transition: "opacity 0.2s ease",
        }}>
          {artwork.title}
        </p>
        <p style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 10,
          fontWeight: 300,
          color: "rgba(242,242,246,0.6)",
          lineHeight: 1.3,
          textShadow: "0 1px 4px rgba(0,0,0,0.7)",
          marginTop: 2,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}>
          {artwork.artist}, {artwork.year}
        </p>
      </div>

      {/* MoMA label top-right */}
      <p style={{
        position: "absolute",
        top: 10,
        right: 10,
        fontFamily: "'Inter Tight', sans-serif",
        fontSize: 9,
        fontWeight: 400,
        color: "rgba(242,242,246,0.5)",
        textShadow: "0 1px 4px rgba(0,0,0,0.7)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}>
        MoMA
      </p>
    </a>
  );
}
