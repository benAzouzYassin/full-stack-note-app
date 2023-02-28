import axios from "axios"
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthStateT, useAuth } from "../stores/authStore";
type RegisterInputsT = {
    userName: string,
    email: string,
    password: string,
    passwordConfirm: string
}


function Register() {
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
    const [passwordErr, setPasswordErr] = useState<string>("")
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInputsT>();
    const onSubmit: SubmitHandler<RegisterInputsT> = async (data) => {
        //
        if (watch("password") === watch("passwordConfirm")) {

            setPasswordErr("")
            try {
                const user = await axios.post("http://localhost:8000/api/user/register", data)
                login(user.data.token)
                setServerError("")
                Navigate('/')
            } catch (error: any) {

                error.response ? setServerError(error.response.data.message) : setServerError(error.message)
            }
        }
        else {
            setPasswordErr("Passwords are not the same")
        }
    }
    return (
        <>
            <form className="flex flex-col gap-3 w-screen h-screen justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-3 text-3xl font-semibold">Register new user</h1>

                <label className="Register--label" >
                    <input className="Register--input" autoComplete="off" type="text" placeholder="enter your name" {...register("userName", { required: true, minLength: 2 })} />
                    <span className="Register-error">{errors.userName?.type == "required" ? "Username is required" : ""}</span>
                </label>

                <label className="Register--label">
                    <input type="text" autoComplete="off" className="Register--input" placeholder="enter your email" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
                    <span className="Register-error">{errors.email?.type == "required" ? "Email is required" : ""}</span>
                    {watch("email") !== "" ? <span className="Register-error">{errors.email ? "Unvalid email" : ""}</span> : ""}
                </label>

                <label className="Register--label">
                    <input type="password" autoComplete="off" className="Register--input" placeholder="enter your password" {...register("password", { required: true })} />
                    <span className="Register-error">{errors.password?.type == "required" ? "password is required" : ""}</span>
                </label>

                <label className="Register--label">
                    <input type="password" autoComplete="off" className="Register--input" placeholder="confirm your password" {...register("passwordConfirm", { required: true })} />
                    <span className="Register-error">{errors.passwordConfirm?.type == "required" ? "Confirme your password please." : ""}</span>
                    <span className="Register-error">{passwordErr}</span>
                </label>
                <div className="flex flex-col w-[70%] max-w-xl mt-[-10px]"><Link className="text-start pl-2 text-gray-900 font-medium hover:text-indigo-700 w-[70%] max-w-xl" to="/login">have account?</Link>
                    <span className=" ml-1 pl-1 pr-7 opacity-85  rounded-sm text-red-600 font-normal">{serverError}</span>
                </div>
                <button className="bg-blue-400 text-white p-2 w-28 rounded-md hover:bg-blue-500" >Register</button>
            </form></>
    )
}

export default Register