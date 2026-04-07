import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { getPets, deletePet } from "../services/petService"
import { Link } from "react-router-dom"
import { petImage } from "../utils/imageUrl"
import Swal from "sweetalert2"

function Dashboard() {
    const [pets, setPets] = useState([])

    const loadPets = async () => {
        try {
            const res = await getPets()
            setPets(res.data.pets ?? res.data ?? [])
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.error ?? "No pets found 🐾",
                background: "#f5c5cb",
                color: "#c0392b",
                confirmButtonColor: "#e74c3c"
            })
        }
    }

    const removePet = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar mascota?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#4caf50",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            background: "#f5c5cb",
            color: "#c0392b"
        })

        if (result.isConfirmed) {
            try {
                const res = await deletePet(id)
                await Swal.fire({
                    icon: "success",
                    title: "¡Eliminada!",
                    text: res.data.message, // "Pet was successfully deleted!"
                    timer: 1500,
                    showConfirmButton: false,
                    background: "#f5c5cb",
                    color: "#c0392b",
                    iconColor: "#4caf50"
                })
                loadPets()
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.error ?? "Pet not found 🐾",
                    background: "#f5c5cb",
                    color: "#c0392b",
                    confirmButtonColor: "#e74c3c"
                })
            }
        }
    }

    useEffect(() => {
        loadPets()
    }, [])

    return (
        <div className="page">
            <Navbar title="Pet List" showAdd={true} showBack={false} />
            <div className="content-card">
                <p className="section-title">Pet List:</p>
                {pets.length === 0 && (
                    <p style={{ color: "#999", textAlign: "center", marginTop: 40 }}>
                        No hay mascotas registradas
                    </p>
                )}
                {pets.map((pet) => (
                    <div className="pet-card" key={pet.id}>
                        <div className="pet-card-avatar">
                            <img src={petImage(pet.image)} alt={pet.name} />
                        </div>
                        <div className="pet-card-info">
                            <div className="pet-card-name">{pet.name}</div>
                            <div className="pet-card-desc">
                                {pet.kind}: {pet.description ?? "Sin descripción"}
                            </div>
                        </div>
                        <div className="pet-card-actions">
                            <Link to={`/show/${pet.id}`} className="icon-btn icon-btn-view">👁</Link>
                            <Link to={`/edit/${pet.id}`} className="icon-btn icon-btn-edit">✏️</Link>
                            <button className="icon-btn icon-btn-delete" onClick={() => removePet(pet.id)}>🗑</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard