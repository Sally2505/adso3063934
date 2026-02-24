import BtnBack from "../components/BtnBack";

// Component
function Misdreavus() {
    return (
        <div style={{ border: '4px solid #40677F', padding: '1.4rem', borderRadius: '0.3rem', background: '#4F3E4292', width: '360px' }}>
            <h2>Misdreavus 👾</h2>
            <p>Type: Ghost</p>
            <p>Hability: Levitate</p>
            <img src="https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/misdreavus.avif" alt="Misdreavu" />
        </div>
    );
}

function Mimikyu() {
    return (
        <div style={{ border: '4px solid #C27919', padding: '1.4rem', borderRadius: '0.3rem', background: '#D9D1AD92', width: '360px' }}>
            <h2>Mimikyu 😵‍💫</h2>
            <p>Type: Ghost</p>
            <p>Hability: Disguise</p>
            <img src="https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/mimikyu.avif" alt="Mimikyu" />
        </div>
    );
}

function Example1Components() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 1: Components</h2>
            <p>Create independent and reusable UI pieces.</p>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem'}}>
                <Misdreavus />
                <Mimikyu />
            </div>
                
            
        </div>
    );
}

export default Example1Components;