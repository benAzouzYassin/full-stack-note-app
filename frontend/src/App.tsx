import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Landpage from "./pages/LandPage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CreateNote from "./pages/CreateNote"
import UpdateNote from "./pages/UpdateNote"

function App() {

  return (
    < BrowserRouter>
      <Routes>
        <Route path="/" element={<Landpage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/create" element={<CreateNote />}></Route>
        <Route path="/update" element={<UpdateNote />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
