import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function RedirectHandler() {

    const location = useLocation()
    const navigate = useNavigate()

    const validRoutes = [
        "/dashboard",
        "/add-pet",
        "/login"
    ]

    useEffect(() => {

        const path = location.pathname

        const validDynamic =
            path.startsWith("/edit-pet/") ||
            path.startsWith("/show-pet/")

        if (!validRoutes.includes(path) && !validDynamic) {
            navigate("/dashboard")
        }

    }, [location, navigate])

    return null
}

export default RedirectHandler