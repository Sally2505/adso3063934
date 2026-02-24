import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

//Data
const pokemons = [
    {id: 1, name: "Misdreavus", type: "Ghost", power: 60, legendary: false,img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/misdreavus.avif"},
    {id: 2, name: "Mimikyu", type: "Ghost", power: 70, legendary: false,img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/mimikyu.avif"},
    {id: 3, name: "Gengar", type: "Ghost", power: 90, legendary: false,img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/gengar.avif"},
    {id: 4, name: "Mew", type: "Psychic", power: 100, legendary: true,img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/mew.avif"}
];


    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Passing data from parent to child components using props.</p>
        </div>
    );
}

export default Example3Props;