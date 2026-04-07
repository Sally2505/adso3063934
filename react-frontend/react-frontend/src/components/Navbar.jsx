import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import api from "../api/axios"

function Navbar({ title, showAdd = true, showBack = false, onBack }) {

    const logout = async () => {
        const result = await Swal.fire({
            title: "¿Cerrar sesión?",
            text: "¿Seguro que quieres salir?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#4caf50",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar",
            background: "#f5c5cb",
            color: "#c0392b"
        })

        if (result.isConfirmed) {
            try {
                const res = await api.post("/logout")
                await Swal.fire({
                    icon: "success",
                    title: "Sesión cerrada",
                    text: res.data.message, // "Sesión cerrada"
                    timer: 1500,
                    showConfirmButton: false,
                    background: "#f5c5cb",
                    color: "#c0392b",
                    iconColor: "#4caf50"
                })
            } catch {
                // si falla igual cerramos sesión
            } finally {
                localStorage.removeItem("token")
                window.location = "/"
            }
        }
    }

    return (
        <nav className="navbar">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {showBack && (
                    <button className="btn-back" onClick={onBack}>&#8592;</button>
                )}
                <span className="navbar-title">{title || "Pet List"}</span>
            </div>
            <div className="navbar-actions">
                {showAdd && (
                    <Link to="/add" className="btn-add">Add Pet</Link>
                )}
                <button className="btn-logout" onClick={logout}>
                    Logout ✕
                </button>
            </div>
        </nav>
    )
}

export default Navbar