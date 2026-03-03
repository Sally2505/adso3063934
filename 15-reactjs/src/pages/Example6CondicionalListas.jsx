import { useState } from "react";
import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function PokemonBox() {

    const [pokemons, setPokemons] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [minPower, setMinPower] = useState(0);
    const [minLevel, setMinLevel] = useState(1);

    const generateRandomPokemon = async () => {
        try {
            const randomId = Math.floor(Math.random() * 1025) + 1;

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${randomId}`
            );

            const data = await response.json();

            const totalPower = data.stats.reduce(
                (acc, stat) => acc + stat.base_stat,
                0
            );

            const randomLevel = Math.floor(Math.random() * 100) + 1;

            const newPokemon = {
                id: Date.now(),
                name: data.name,
                type: data.types.map(t => t.type.name).join("/"),
                power: totalPower,
                legendary: data.base_experience > 250,
                img: data.sprites.other["official-artwork"].front_default,
                level: randomLevel
            };

            setPokemons(prev => [...prev, newPokemon]);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const resetFilters = () => {
        setFilterType("all");
        setMinPower(0);
        setMinLevel(1);
    };

    const filteredPokemons = pokemons.filter(pokemon =>
        (filterType === "all" || pokemon.type.toLowerCase().includes(filterType)) &&
        pokemon.power >= minPower &&
        pokemon.level >= minLevel
    );

    const styles = {

        controls: {
            background: "rgba(0,0,0,0.4)",
            padding: "20px",
            borderRadius: "16px",
            marginTop: "20px",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(255,255,255,0.1)"
        },

        button: {
            padding: "12px 24px",
            borderRadius: "30px",
            border: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            background: "linear-gradient(145deg,#ff1c1c,#cc0000)",
            color: "white",
            boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
            marginBottom: "15px"
        },

        select: {
            padding: "8px 12px",
            borderRadius: "8px",
            border: "2px solid #ffcb05",
            background: "#1b1b1b",
            color: "white",
            marginBottom: "15px"
        },

        slider: {
            width: "100%",
            accentColor: "#ffcb05",
            marginBottom: "10px"
        },

        label: {
            fontSize: "0.9rem",
            marginBottom: "4px"
        },

        cards: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            padding: "20px"
        }
    };

    return (
        <div className="container">
            <BtnBack />

            <h2>Pokemon Box</h2>
            <p>Advanced Pokémon filtering system.</p>

            <div style={styles.controls}>

                <button style={styles.button} onClick={generateRandomPokemon}>
                    ⚡ Generate Pokémon
                </button>

                <div>
                    <select
                        style={styles.select}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="ghost">Ghost</option>
                        <option value="psychic">Psychic</option>
                        <option value="dark">Dark</option>
                        <option value="normal">Normal</option>
                        <option value="dragon">Dragon</option>
                        <option value="ice">Ice</option>
                        <option value="poison">Poison</option>
                        <option value="fairy">Fairy</option>
                    </select>
                </div>

                <div>
                    <p style={styles.label}>Minimum Power: {minPower}</p>
                    <input
                        type="range"
                        min="0"
                        max="800"
                        value={minPower}
                        onChange={(e) => setMinPower(Number(e.target.value))}
                        style={styles.slider}
                    />
                </div>

                <div>
                    <p style={styles.label}>Minimum Level: {minLevel}</p>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={minLevel}
                        onChange={(e) => setMinLevel(Number(e.target.value))}
                        style={styles.slider}
                    />
                </div>

            </div>

            <div style={styles.cards}>

                {filteredPokemons.length > 0 ? (

                    filteredPokemons.map(pokemon => (
                        <CardPokemon
                            key={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            power={pokemon.power}
                            legendary={pokemon.legendary}
                            image={pokemon.img}
                            level={pokemon.level}
                        />
                    ))

                ) : pokemons.length > 0 ? (

                    <div style={{
                        width: "100%",
                        textAlign: "center",
                        padding: "30px",
                        borderRadius: "16px",
                        background: "rgba(0,0,0,0.5)",
                        animation: "fadeIn 0.4s ease-in-out"
                    }}>
                        <h3 style={{ color: "#ffcb05" }}>
                            🚫 No Pokémon match your filters
                        </h3>

                        <button
                            onClick={resetFilters}
                            style={{
                                marginTop: "15px",
                                padding: "10px 20px",
                                borderRadius: "25px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "bold",
                                background: "linear-gradient(145deg,#ffcb05,#f7a600)",
                                color: "#1b1b1b",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
                            }}
                        >
                            🔄 Reset Filters
                        </button>
                    </div>

                ) : (

                    <p style={{
                        opacity: 0.6,
                        textAlign: "center",
                        width: "100%"
                    }}>
                        No Pokémon generated yet...
                    </p>

                )}

            </div>

        </div>
    );
}

export default PokemonBox;