function PokemonCard({ id, name, type }) {
    const imgUrl =
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
      <article
        className="pokemon-card"
        style={{
          border: "1px solid #e0e0e0",
          backgroundColor: "#21182180",
          borderRadius: 10,
          padding: 12,
          background: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "#ccc",
          width: "180px",
        }}
      >
        {/* Nombre arriba */}
        <div style={{ fontWeight: 700, marginBottom: 4, textAlign: "center" }}>{name}</div>

        {/* Contenedor de imagen */}
        <div
          style={{
            width: 120,
            height: 120,
            display: "grid",
            placeItems: "center",
            background: "#211821",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <img
            src={imgUrl}
            width={120}
            height={120}
            alt={`Imagen de ${name}`}
            loading="lazy"
            style={{ objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            }}
          />
        </div>

        {/* Tipo debajo (si quieres ocultarlo, puedes eliminar este bloque) */}
        <div style={{ fontSize: 12, color: "#ccc" }}>Tipo: {type}</div>
      </article>
    );
  }

  export default PokemonCard;