import { useNavigate } from "react-router-dom"
import { useAuth } from "../stores/authStore"
import { useUser } from "../stores/userStore"

function Navbar() {
    const Navigate = useNavigate()
    const { name } = useUser((state: any) => state.userData)
    const logout = useAuth(state => state.logout)
    const handleLogout = () => {
        Navigate("/login")
        logout()
    }

    return (
        <div className='items-center flex h-16 w-full bg-black xl:pl-40 xl:pr-40'>
            <span className="ml-3 text-lg text-white">{name}</span>
            <button className="ml-auto mr-3 bg-[#FFBD35] p-2 rounded-lg text-black font-semibold hover:bg-[#f7d44c]" onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Navbar