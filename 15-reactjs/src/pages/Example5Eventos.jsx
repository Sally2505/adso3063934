import { useState } from "react";
import BtnBack from "../components/BtnBack";

function Example5Eventos() {
  const [chosenPokemon, setChosenPokemon] = useState(null);

  const handleChoice = (name, event) => {
    console.log(event);
    setChosenPokemon(name);
  };

  const buttonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "5px",
  };

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 5: Event Handling</h2>
      <p>Respond to user interactions (click, hover, input, submit ).</p>

      <div>
        <h3>Click Event</h3>
        <button onClick={(e) => handleChoice("Gengar")} style={buttonStyle}>
          Gengar
        </button>
        <button
          onClick={(e) => handleChoice("Misdreavus")}
          style={buttonStyle}
        >
          Misdreavus
        </button>
        <button onClick={(e) => handleChoice("Mimikyu")} style={buttonStyle}>
          Mimikyu
        </button>


        {chosenPokemon ? (<p>You chose: {chosenPokemon}!</p>) : (<p>No Pokémon chosen yet.</p>)}
      </div>
    </div>
  );
}

export default Example5Eventos;