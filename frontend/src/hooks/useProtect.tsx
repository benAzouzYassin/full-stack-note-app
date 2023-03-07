import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../stores/userStore";

function useProtect() {
    const Navigate = useNavigate()
    const setUserData = useUser((state: any) => state.setUserData)
    useEffect(() => {
        axios.get("http://localhost:8000/api/user/me", { headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` } })
            .then((data: any) => { setUserData(data.data) })
            .catch(err => Navigate("/login"))
    }, [])
}
export default useProtect