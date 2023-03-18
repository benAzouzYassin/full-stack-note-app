import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useProtect from "../hooks/useProtect";
import axios from "axios";
import { useEffect } from "react";
interface Inputs {
    noteText?: string
}


function UpdateNote() {
    useProtect()
    const Navigate = useNavigate()

    const location = useLocation()
    const state = location

    const { oldText, noteId } = location.state

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit: SubmitHandler<Inputs> = data => {
        axios.put(`http://localhost:8000/api/notes/${noteId}`, { text: watch("noteText") ?? oldText }, { headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` } })
            .then(() => Navigate('/'))
            .catch(err => console.log(err))
    }

    const handleDelete = () => {
        axios.delete("http://localhost:8000/api/notes/", { headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` }, data: { 'noteId': noteId } })
            .then(data => Navigate("/"))
            .catch(err => console.error(err))

    }

    const handleKeyDown = (e: any) => {
        if (e.key == "Enter") {
            e.preventDefault()
        }
    }
    return (<>
        <Navbar />
        <form className="flex flex-col bg-[#f7d44c] text-center h-screen pl-5 pr-5 items-center  xl:pl-40 xl:pr-40 " onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
            <div className="w-[90%] flex mt-7"><button className=" ml-auto bg-red-600 pl-2 pr-2 hover:bg-red-500 p-1 rounded-md text-white " onClick={handleDelete}>Delete</button></div>
            <input className="w-[90%] bg-[#c7cfdb] pb-[300px] rounded-md pl-4 pt-2 mt-10 " autoFocus autoComplete="off" placeholder="Enter your note text"  {...register("noteText", { required: true, value: oldText })} />
            <p className="text-red-600 w-[90%] text-left ">{errors.noteText?.type == "required" ? "note text is required" : ""}</p>
            <div className="w-full flex mt-5 gap-5 justify-center">
                <input type="submit" value={"Save"} className="bg-blue-500 p-2 rounded-lg pl-4 pr-4 text-white hover:bg-blue-400" />
                <button className="bg-white p-2 rounded-lg text-blue-500 border-blue-500 border-[2px] hover:bg-blue-50" onClick={(e) => {
                    e.preventDefault()
                    Navigate("/")
                }}>Cancel</button></div>
        </form>

    </>
    )
}

export default UpdateNote