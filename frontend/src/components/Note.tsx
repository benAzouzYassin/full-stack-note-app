import axios from "axios"
import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
type Props = {
    text: string
    id: string
}
function Note(props: Props) {
    const Navigate = useNavigate()
    const [isHidden, setIsHidden] = useState("")
    const handleDelete = () => {
        axios.delete("http://localhost:8000/api/notes/", { headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` }, data: { noteId: props.id } })
            .then(data => setIsHidden("hidden"))
            .catch(err => console.error(err))

    }
    const handleEdit = () => {
        Navigate("/update", { state: { oldText: props.text } })
    }
    return (
        <div className={`${isHidden} Note--border xl:min-h-[120px] min-h-[80px] rounded-md h-fit  pl-2 pr-2 pb-2 bg-[#fffff0] hover:cursor-pointer hover:scale-95`} onClick={handleEdit} >
            <AiFillCloseCircle className=" mt-2 ml-auto w-5   hover:cursor-pointer xl:h-6 xl:w-6 text-red-500 " onClick={handleDelete} />
            <p className="mt-[-20px] pr-4">{props.text}</p>

        </div>
    )
}

export default Note