import { useEffect, useState } from "react";
import api from "../api/axios";

function PetsList() {

    const [pets, setPets] = useState([]);

    useEffect(() => {

        const getPets = async () => {

            const res = await api.get("/pets");

            setPets(res.data);
        };

        getPets();

    }, []);

    return (

        <div>

            <h2>Pets</h2>

            {pets.map((pet) => (
                <div key={pet.id}>
                    {pet.name}
                </div>
            ))}

        </div>
    );
}

export default PetsList;