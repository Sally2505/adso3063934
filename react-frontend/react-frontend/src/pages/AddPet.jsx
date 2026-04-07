import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPet } from "../services/petService"
import Swal from "sweetalert2"

function AddPet() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "", kind: "", weight: "", age: "", breed: "", location: "", description: ""
    })
    const [photo, setPhoto] = useState(null)
    const [preview, setPreview] = useState(null)

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
            e.target.value = ""
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
            e.target.value = ""
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

            const res = await createPet(formData)
            await Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: res.data.message, // "Pet was successfully added!"
                timer: 1500,
                showConfirmButton: false,
                background: "#f5c5cb",
                color: "#c0392b",
                iconColor: "#4caf50"
            })
            navigate("/dashboard")
        } catch (error) {
            const errors = error.response?.data?.errors
            const message = errors
                ? Object.values(errors).flat().join("\n")
                : error.response?.data?.message ?? "Error in the request"

            Swal.fire({
                icon: "error",
                title: "Error in the request",
                text: message,
                background: "#f5c5cb",
                color: "#c0392b",
                confirmButtonColor: "#e74c3c"
            })
        }
    }

    return (
        <div className="page">
            <nav className="navbar">
                <span className="navbar-title">Add</span>
                <span style={{ fontSize: 22, color: "white" }}>➕</span>
            </nav>
            <div className="content-card">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="photo-input">
                        <div className="photo-upload-area">
                            {preview
                                ? <img src={preview} alt="preview" />
                                : <span style={{ fontSize: 40 }}>🐾</span>
                            }
                            <span className="photo-upload-label">
                                {preview ? "Cambiar foto" : "Agregar foto"}
                            </span>
                        </div>
                    </label>
                    <input id="photo-input" type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />

                    <div className="form-group"><label>Name:</label><input name="name" placeholder="Pikachu" onChange={handleChange} value={form.name} /></div>
                    <div className="form-group"><label>Kind:</label><input name="kind" placeholder="Mouse" onChange={handleChange} value={form.kind} /></div>
                    <div className="form-group"><label>Weight:</label><input name="weight" placeholder="4" onChange={handleChange} value={form.weight} /></div>
                    <div className="form-group"><label>Age:</label><input name="age" placeholder="1" onChange={handleChange} value={form.age} /></div>
                    <div className="form-group"><label>Breed:</label><input name="breed" placeholder="Electric" onChange={handleChange} value={form.breed} /></div>
                    <div className="form-group"><label>Location:</label><input name="location" placeholder="Pueblo Paleta" onChange={handleChange} value={form.location} /></div>
                    <div className="form-group"><label>Description:</label><textarea name="description" placeholder="Descripción..." onChange={handleChange} value={form.description} rows={3} /></div>

                    <div className="btn-row">
                        <button type="submit" className="btn-primary">Add Pet</button>
                        <button type="button" className="btn-danger" onClick={() => navigate("/dashboard")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPet