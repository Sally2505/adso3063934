import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPet, updatePet } from "../services/petService"
import { petImage } from "../utils/imageUrl"
import Swal from "sweetalert2"

function EditPet() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "", kind: "", weight: "", age: "", breed: "", location: "", description: ""
    })
    const [photo, setPhoto] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getPet(id)
                const pet = res.data.pet ?? res.data
                setForm({
                    name: pet.name ?? "",
                    kind: pet.kind ?? "",
                    weight: pet.weight ?? "",
                    age: pet.age ?? "",
                    breed: pet.breed ?? "",
                    location: pet.location ?? "",
                    description: pet.description ?? "",
                })
                setPreview(petImage(pet.image))
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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
        if (!allowed.includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Formato inválido",
                text: "Solo se permiten imágenes (jpeg, png, jpg, webp)",
                background: "#f5c5cb",
                color: "#c0392b",
                confirmButtonColor: "#e74c3c"
            })
            return
        }
        if (file.size > 2 * 1024 * 1024) {
            Swal.fire({
                icon: "warning",
                title: "Imagen muy grande",
                text: "La imagen no puede pesar más de 2MB",
                background: "#f5c5cb",
                color: "#c0392b",
                confirmButtonColor: "#e74c3c"
            })
            return
        }

        setPhoto(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            Object.entries(form).forEach(([key, val]) => formData.append(key, val))
            if (photo) formData.append("image", photo)
            formData.append("_method", "PUT")

            const res = await updatePet(id, formData)
            await Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: res.data.message, // "Pet updated successfully! ✨"
                timer: 1500,
                showConfirmButton: false,
                background: "#f5c5cb",
                color: "#c0392b",
                iconColor: "#4caf50"
            })
            navigate("/dashboard")
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.error ?? error.response?.data?.message ?? "Error al actualizar la mascota",
                background: "#f5c5cb",
                color: "#c0392b",
                confirmButtonColor: "#e74c3c"
            })
        }
    }

    return (
        <div className="page">
            <nav className="navbar">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button className="btn-back" onClick={() => navigate("/dashboard")}>&#8592;</button>
                    <span className="navbar-title">Edit</span>
                </div>
                <span style={{ fontSize: 22, color: "white" }}>✏️</span>
            </nav>
            <div className="content-card">
                <label htmlFor="edit-photo-input">
                    <div className="photo-upload-area">
                        {preview ? <img src={preview} alt="foto" /> : <span style={{ fontSize: 40 }}>🐾</span>}
                        <span className="photo-upload-label">Edit Photo</span>
                    </div>
                </label>
                <input id="edit-photo-input" type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />

                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label>Name:</label><input name="name" onChange={handleChange} value={form.name} /></div>
                    <div className="form-group"><label>Kind:</label><input name="kind" onChange={handleChange} value={form.kind} /></div>
                    <div className="form-group"><label>Weight:</label><input name="weight" onChange={handleChange} value={form.weight} /></div>
                    <div className="form-group"><label>Age:</label><input name="age" onChange={handleChange} value={form.age} /></div>
                    <div className="form-group"><label>Breed:</label><input name="breed" onChange={handleChange} value={form.breed} /></div>
                    <div className="form-group"><label>Location:</label><input name="location" onChange={handleChange} value={form.location} /></div>
                    <div className="form-group"><label>Description:</label><textarea name="description" onChange={handleChange} value={form.description} rows={3} /></div>

                    <div className="btn-row">
                        <button type="submit" className="btn-primary">Agree</button>
                        <button type="button" className="btn-danger" onClick={() => navigate("/dashboard")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPet