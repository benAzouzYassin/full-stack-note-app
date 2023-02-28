import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Landpage from "./pages/LandPage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAuth } from "./stores/authStore"

function App() {

  return (
    < BrowserRouter>
      <Routes>
        <Route path="/" element={<Landpage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
