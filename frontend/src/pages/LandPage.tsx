import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../stores/authStore"
type userDataT = {
    email: string,
    id: string,
    name: string
}

function LandPage() {
    const Navigate = useNavigate()
    const logout = useAuth(state => state.logout)
    const logoutUser = () => {
        Navigate("/login")
        logout()
    }
    const [userData, setUserData] = useState<userDataT>()
    useEffect(() => {
        axios.get("http://localhost:8000/api/user/me", { headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` } })
            .then((data: any) => { setUserData(data.data) })
            .catch(err => Navigate("/login"))
    }, [])


    return (<>
        <div className="flex flex-col w-screen h-screen items-center justify-center bg-[#fffff0]">
            <h1 className=" mt-[-200px] text-4xl">hello  {userData?.name}</h1>
            <h1 className="mt-3 text-xl">your email is {userData?.email}</h1>
            <button className="bg-gray-600 mt-3 text-white p-2 rounded-md" onClick={logoutUser}>Logout</button>
        </div>
    </>)

}

export default LandPage