import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPet } from "../services/petService"
import { petImage } from "../utils/imageUrl"
import Swal from "sweetalert2"

function ShowPet() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pet, setPet] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getPet(id)
                setPet(res.data.pet ?? res.data)
            } catch (error) {
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.error ?? "Pet not found 🐾",
                    confirmButtonText: "Volver al inicio",
                    background: "#f5c5cb",
                    color: "#c0392b",
                    confirmButtonColor: "#e74c3c"
                })
                navigate("/dashboard")
            }
        }
        load()
    }, [id])

    if (!pet) return (
        <div className="page">
            <div className="content-card" style={{ textAlign: "center", paddingTop: 40 }}>
                Cargando...
            </div>
        </div>
    )

    return (
        <div className="page">
            <nav className="navbar">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button className="btn-back" onClick={() => navigate("/dashboard")}>&#8592;</button>
                    <span className="navbar-title">Show</span>
                </div>
                <span style={{ fontSize: 22, color: "white" }}>🐾</span>
            </nav>

            <div className="content-card">
                <div className="photo-upload-area" style={{ cursor: "default" }}>
                    <img src={petImage(pet.image)} alt={pet.name} />
                </div>

                {[
                    { label: "Name:", value: pet.name },
                    { label: "Kind:", value: pet.kind },
                    { label: "Weight:", value: pet.weight },
                    { label: "Age:", value: pet.age },
                    { label: "Breed:", value: pet.breed },
                    { label: "Location:", value: pet.location },
                    { label: "Description:", value: pet.description },
                ].map(({ label, value }) => value && (
                    <div className="show-field" key={label}>
                        <label>{label}</label>
                        <div className="show-field-value">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowPet