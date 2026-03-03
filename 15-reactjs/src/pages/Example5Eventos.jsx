import BtnBack from "../components/BtnBack";
import { useState } from "react";
import "./Example5Eventos.css";

function Example5Eventos() {
  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [hoveredPokemon, setHoveredPokemon] = useState(null);
  const [inputRange, setInputRange] = useState(0);

  const handleChoice = (name, event) => {
    setChosenPokemon(name);
  };

  const handleMouseEnter = (name) => {
    setHoveredPokemon(name);
  };

  const handleMouseLeave = () => {
    setHoveredPokemon(null);
  };

  const handleInput = (e) => {
    setInputRange(e.target.value);
  };

  const titleH3 = {
    borderBottom: "2px dotted",
    paddingBottom: "1rem",
    marginBottom: "0.4rem",
  };

  const eventContainer = {
    flex: 1,
    marginBottom: "1.4rem",
    minWidth: "250px",
  };

  const btnClick = {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  };

  const rangeStyle = {
    accentColor: "#4caaaf8a",
    width: "100%",
    marginTop: "1rem",
  };

  const outPut = {
    fontSize: "4rem",
    textAlign: "center",
    marginBottom: "2rem",
  };

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 5 - Event Handling</h2>
      <p>Respond to user interactions (click, hover, input changes, etc.)</p>

      <div style={eventContainer}>
        <h3 style={titleH3}>Click Event:</h3>

        <button
          onClick={(e) => handleChoice("Bulbasaur", e)}
          className="choice-button"
        >
          <span style={{ zoom: 2.4 }}>🎋</span> Bulbasaur
        </button>

        <button
          onClick={(e) => handleChoice("Charmander", e)}
          className="choice-button"
        >
          <span style={{ zoom: 2.4 }}>🔥</span> Charmander
        </button>

        <button
          onClick={(e) => handleChoice("Squirtle", e)}
          className="choice-button"
        >
          <span style={{ zoom: 2.4 }}>💧</span> Squirtle
        </button>

        {chosenPokemon && (
          <div className="choice-dialog">
            You chose: {chosenPokemon}
          </div>
        )}

        <div style={eventContainer}>
          <h3 style={titleH3}>MouseEnter/MouseLeave Event:</h3>
        </div>

        <div style={btnClick}>
          <button
            onMouseEnter={() => handleMouseEnter("Pikachu")}
            onMouseLeave={handleMouseLeave}
            className={
              hoveredPokemon === "Pikachu"
                ? "hover-button active"
                : "hover-button"
            }
          >
            Hover here!
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt="Pikachu"
            />
          </button>

          <button
            onMouseEnter={() => handleMouseEnter("Dusknoir")}
            onMouseLeave={handleMouseLeave}
            className={
              hoveredPokemon === "Dusknoir"
                ? "hover-button active"
                : "hover-button"
            }
          >
            Hover here!
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/477.png"
              alt="Dusknoir"
            />
          </button>
        </div>

        {hoveredPokemon && (
          <div className="choice-dialog hover-dialog">
            You hovered: {hoveredPokemon}
          </div>
        )}

        <h3 style={titleH3}>Input Event:</h3>

        <input
          style={rangeStyle}
          onInput={handleInput}
          type="range"
          min="0"
          max="100"
        />

        <span style={{ display: "block", textAlign: "center" }}>
          power:
        </span>

        <div style={outPut}>{inputRange}</div>
      </div>
    </div>
  );
}

export default Example5Eventos;