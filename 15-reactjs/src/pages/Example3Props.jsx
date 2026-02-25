import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

    //Data
    const pokemons = [
        { id: 1, name: "Misdreavus", type: "Ghost", power: 60, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/misdreavus.avif" },
        { id: 2, name: "Mimikyu", type: "Ghost", power: 70, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/mimikyu.avif" },
        { id: 3, name: "Gengar", type: "Ghost", power: 90, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/gengar.avif" },
        { id: 4, name: "Mew", type: "Psychic", power: 100, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/mew.avif" }
    ];

    //Styles
    const styles = {
        cards: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        }
    }


    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Passing data from parent to child components using props.</p>
            <div style={styles.cards}>
                {/* We pass different props to each CardPokemon component */}
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                            image={pokemon.img}
                            key={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            power={pokemon.power}
                            legendary={pokemon.legendary}


                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Example3Props;