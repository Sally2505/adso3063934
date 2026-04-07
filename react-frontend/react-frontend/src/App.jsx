import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./pages/Login"
import AddPet from "./pages/AddPet"
import Dashboard from "./pages/DashBoard"
import EditPet from "./pages/EditPet"
import ShowPet from "./pages/ShowPet"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* ✅ Rutas protegidas anidadas dentro de Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddPet />} />
          <Route path="/edit/:id" element={<EditPet />} />
          <Route path="/show/:id" element={<ShowPet />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App