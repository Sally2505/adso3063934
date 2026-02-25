import './CardPokemon.css';
function CardPokemon({ name, type, power, image, legendary = false }) {

const  typeColors = {
    "Ghost": "#6A0DAD",
    "Psychic": "#FF69B4",
    // Add more types and their corresponding colors as needed
}

    return (
        
        <div className="pokemon-card" style={{ borderColor: typeColors[type] || "#000" }}>
            <img src={image} alt={name} className='pokemon-image' />
            <h3>{name}</h3>
            <p className='pokemon-type'>Type: {type}</p>
            <p className='pokemon-power'>Power: {power}</p>
            {legendary && <span className='legendary-badge'>⭐Legendary⭐</span>}
        </div>
    );
}

export default CardPokemon;