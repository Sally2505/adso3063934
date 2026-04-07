import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import bgLogin from "../assets/bg-login.png"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) navigate("/dashboard")
    }, [])

    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/login",
                { email, password }
            )
            localStorage.setItem("token", res.data.access_token)
            await Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: "Inicio de sesión exitoso",
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
                text: error.response?.data?.message ?? "Credenciales inválidas",
                background: "#f5c5cb",
                color: "#c0392b",
                confirmButtonColor: "#e74c3c"
            })
        }
    }

    return (
        <div className="login-page">
            <div className="login-hero">
                <img src={bgLogin} alt="bg" className="login-bg-img" />
                <div className="login-hero-title">LOGIN 👤</div>
            </div>
            <div className="login-form-card">
                <form onSubmit={login}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder="correo@ejemplo.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" placeholder="contraseña" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn-primary">LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default Login