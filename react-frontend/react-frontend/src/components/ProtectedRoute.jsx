import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
    const [isValid, setIsValid] = useState(null)

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token")
            console.log("Token encontrado:", token) // ← ¿hay token?

            if (!token) {
                setIsValid(false)
                return
            }

            try {
                const res = await fetch("http://127.0.0.1:8000/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                })

                console.log("Status de Laravel:", res.status) // ← ¿qué responde Laravel?
                setIsValid(res.ok)
            } catch (error) {
                console.log("Error de red:", error) // ← ¿hay error de conexión?
                setIsValid(false)
            }
        }

        verifyToken()
    }, [])

    console.log("isValid:", isValid) // ← ¿qué valor tiene?

    if (isValid === null) return <p>Verificando...</p>

    return isValid ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute