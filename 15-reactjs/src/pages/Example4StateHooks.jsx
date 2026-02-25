import { useEffect, useMemo, useState } from "react";
import BtnBack from "../components/BtnBack";
import PokemonCard from "../components/PokemonCard";

function Example4StateHooks() {
  const pokedex = useMemo(
    () => [
      { id: 92, name: "Gastly", type: "Ghost/Poison" },
      { id: 93, name: "Haunter", type: "Ghost/Poison" },
      { id: 94, name: "Gengar", type: "Ghost/Poison" },
      { id: 200, name: "Misdreavus", type: "Ghost" },
      { id: 353, name: "Shuppet", type: "Ghost" },
      { id: 354, name: "Banette", type: "Ghost" },
      { id: 355, name: "Duskull", type: "Ghost" },
      { id: 356, name: "Dusclops", type: "Ghost" },
      { id: 425, name: "Drifloon", type: "Ghost/Flying" },
      { id: 426, name: "Drifblim", type: "Ghost/Flying" },
    ],
    []
  );

  const [isCapturing, setIsCapturing] = useState(false);
  const [captured, setCaptured] = useState(null);
  const [history, setHistory] = useState([]);
  const [timerId, setTimerId] = useState(null);

  const handleCapture = () => {
    if (isCapturing) return;
    setIsCapturing(true);
    setCaptured(null);

    const id = setTimeout(() => {
      const random = Math.floor(Math.random() * pokedex.length);
      const result = pokedex[random];
      setCaptured(result);
      setHistory((prev) => [result, ...prev]);
      setIsCapturing(false);
    }, 1500);

    setTimerId(id);
  };

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  const getImgUrl = (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 4: State Hooks</h2>
      <h3>(useState, useEffect)</h3>
      <p>Manage dynamic data and side effects in React components</p>

      <section style={{ marginTop: 16 }}>
        {/* Contenedor para centrar el botón */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleCapture}
            disabled={isCapturing}
            className="btn-capture"
            style={{
              padding: "8px 14px",
              backgroundColor: isCapturing ? "#bbb" : "#a57aa6",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: isCapturing ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease-in-out",
            }}
          >
            {isCapturing ? "Capturando pokémon..." : "Capturar pokémon"}
          </button>
        </div>

        {/* Contenedor para centrar el bloque de captura */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {captured && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                background: "#21182180",
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "320px",
                color: "#e0e0e0",
              }}
              aria-live="polite"
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  display: "grid",
                  placeItems: "center",
                  background: "#211821",
                  borderRadius: 8,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={getImgUrl(captured.id)}
                  width={90}
                  height={90}
                  alt={`Imagen de ${captured.name}`}
                  loading="eager"
                  style={{ objectFit: "contain" }}
                  onError={(e) => {
                    e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${captured.id}.png`;
                  }}
                />
              </div>
              <strong>¡Has capturado a {captured.name}!</strong>
            </div>
          )}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h4 style={{ textAlign: "center" }}>Lista de pokemones</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            marginTop: 12,
          }}
        >
          {pokedex.map((p) => (
            <PokemonCard key={p.id} id={p.id} name={p.name} type={p.type} />
          ))}
        </div>
      </section>

      {history.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h4 style={{ textAlign: "center" }}>Historial de capturas</h4>
          {/* Contenedor centrado del historial */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ul style={{ marginTop: 8, listStyle: "none", padding: 0, width: "min(560px, 100%)" }}>
              {history.map((h, idx) => (
                <li
                  key={`${h.id}-${idx}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 10px",
                    border: "1px solid #e0e0e0",
                    borderRadius: 8,
                    background: "#21182180",
                    marginBottom: 8,
                  }}
                >
                  <img
                    src={getImgUrl(h.id)}
                    alt={`Imagen de ${h.name}`}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${h.id}.png`;
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 600 }}>{h.name}</span>
                    <span style={{ fontSize: 12, color: "#ccc" }}>{h.type}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default Example4StateHooks;