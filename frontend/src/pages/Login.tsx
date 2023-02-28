import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthStateT, useAuth } from "../stores/authStore";
type LoginInputsT = {
    email: string,
    password: string
}

function Login() {
    const Navigate = useNavigate()

    //checking if user is logged in
    useEffect(() => {
        axios.get("http://localhost:8000/api/user/me", { headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` } })
            .then(data => Navigate("/"))
            .catch(err => err)
    }, [])

    const login = useAuth((state: AuthStateT) => state.login)

    const [serverError, setServerError] = useState("")
    //form handeling
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInputsT>();
    const onSubmit: SubmitHandler<LoginInputsT> = async (data) => {

        try {
            const user = await axios.post("http://localhost:8000/api/user/login", data)
            login(user.data.token)
            setServerError("")
            Navigate("/")
        } catch (error: any) {

            error.response ? setServerError(error.response.data.message) : setServerError(error.message)
        }
    }
    return (
        <> <form className="flex flex-col gap-2 mt-[-50px] w-screen h-screen justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-5 text-3xl font-semibold">Login new user</h1>
            <label className="Register--label">
                <input type="text" autoComplete="off" className="Register--input" placeholder="enter your email" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
                <span className="Register-error">{errors.email?.type == "required" ? "Email is required" : ""}</span>
                {watch("email") !== "" ? <span className="Register-error">{errors.email ? "Unvalid email" : ""}</span> : ""}
            </label>

            <label className="Register--label">
                <input type="password" autoComplete="off" className="Register--input" placeholder="enter your password" {...register("password", { required: true })} />
                <span className="Register-error">{errors.password?.type == "required" ? "password is required" : ""}</span>
            </label><div className="flex flex-col w-[70%] max-w-xl mt-[-10px]">
                <span className=" ml-1 pl-1 pr-7 opacity-85  rounded-sm text-red-600 font-normal">{serverError}</span>
                <Link className="mt-1 pl-2 text-gray-900 font-medium hover:text-indigo-700 " to="/register">don't have account?</Link>
            </div>
            <button className="bg-blue-400 mt-5 text-white p-2 w-28 rounded-md hover:bg-blue-500" >Login</button>
        </form></>
    )
}

export default Login