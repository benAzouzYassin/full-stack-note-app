import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useProtect from "../hooks/useProtect";
interface Inputs {
    noteText?: string
}
type Props = {
    oldText: string
}

function UpdateNote(props: Props) {
    useProtect()
    const location = useLocation()
    const { oldText } = location.state

    const Navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

    return (<>
        <Navbar />
        <form className="flex flex-col bg-[#ffffd0] text-center h-screen pl-5 pr-5 items-center  xl:pl-40 xl:pr-40 " onSubmit={handleSubmit(onSubmit)}>
            <input className="w-[90%] bg-[#fffff0] pb-[300px] rounded-md pl-4 pt-2 mt-12" autoComplete="off" placeholder="Enter your note text" value={oldText}  {...register("noteText", { required: true })} />
            <p className="text-red-600 w-[90%] text-left ">{errors.noteText?.type == "required" ? "note text is required" : ""}</p>
            <div className="w-full flex mt-5 gap-5 justify-center">
                <button className="bg-blue-500 p-2 rounded-lg pl-4 pr-4 text-white hover:bg-blue-400" >Save</button>
                <button className="bg-white p-2 rounded-lg text-blue-500 border-blue-500 border-[2px] hover:bg-blue-50" onClick={(e) => {
                    e.preventDefault()
                    Navigate("/")
                }}>Cancel</button></div>
        </form>

    </>
    )
}

export default UpdateNote