import { Routes, Route, Link, useLocation } from 'react-router-dom';
import BtnBack from "../components/BtnBack";

function GeneralInfo() {
    return (
        <div
  style={{
    margin: "2rem auto",
    padding: "2rem",
    width: "85%",
    borderRadius: "1rem",
    textAlign: "center",
    background: "linear-gradient(135deg, #2b1055, #0005)",
    color: "#f1f1f1",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
  }}
>
  <h2>General Info</h2>
  <p>Welcome to the Pokemon Info Page</p>
  <p></p>
</div>
    )
}

function PokemonList() {
    return (
       <div
  style={{
    margin: "2rem auto",
    padding: "2rem",
    width: "85%",
    borderRadius: "1rem",
    textAlign: "center",
    background: "linear-gradient(135deg, #2b1055, #0005)",
    color: "#f1f1f1",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
  }}
>
  <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
    Ghost Pokemon List
  </h2>

  <p style={{ marginBottom: "1.5rem", opacity: "0.85" }}>
    Explore some of the most mysterious and powerful Ghost Pokemon.
  </p>

  <ul
    style={{
      listStyle: "none",
      padding: 0,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "0.8rem",
      fontSize: "1.2rem"
    }}
  >
    <li>Misdreavus</li>
    <li>Mimikyu</li>
    <li>Gengar</li>
    <li>Banette</li>
    <li>Duskull</li>
    <li>Dusclops</li>
    <li>Spiritomb</li>
    <li>Chandelure</li>
    <li>Drifblim</li>
    <li>Aegislash</li>
    <li>Sableye</li>
    <li>Giratina</li>
  </ul>
</div>
    )
}

function PokemonDetails() {
    return (
       <div
  style={{
    margin: "2rem auto",
    padding: "2rem",
    width: "85%",
    borderRadius: "1rem",
    textAlign: "center",
    border: "2px solid #000",
    background: "linear-gradient(135deg, #2b1055, #0005)",
    color: "#f1f1f1",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
  }}
>
    <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
    Pokemon Details
  </h2>

  <p style={{ marginBottom: "1.5rem", opacity: "0.85" }}>
    Misdreavus is a Ghost-type Pokemon known for its eerie cries and ability to manipulate fear. It has a mischievous nature and is often found in haunted locations.
  </p>
  <img src="https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/misdreavus.avif" alt="" />
</div>
    )
}

function InternalNavigation() {
    return (
        <nav>
            <Link to="/example7" style={{ marginRight: "15px" }}>Home</Link>
            <Link to="/example7/list" style={{ marginRight: "15px" }}>Pokemon List</Link>
            <Link to="/example7/details?name=Misdrevaus" style={{ marginRight: "15px" }}>Misdrevaus 👾</Link>
        </nav>
    )
}

function Example7Routing() {
    const location = useLocation();
    return (
        <div className="container">
            <BtnBack />

            <h2>Example 7: Routing</h2>
            <p>Navigation between diferent 'pages' without reloading the browser</p>
            <InternalNavigation />
            <Routes>
                <Route path="/" element={<GeneralInfo />}></Route>
                <Route path="/list" element={<PokemonList />}></Route>
                <Route path="/details" element={<PokemonDetails />}></Route>
            </Routes>
        </div>
    )
}

export default Example7Routing;