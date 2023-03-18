
import { useNavigate } from "react-router-dom"
type Props = {
    text: string
    id: string
}
function Note(props: Props) {
    const Navigate = useNavigate()

    const handleEdit = () => {
        Navigate("/update", { state: { oldText: props.text, noteId: props.id } })
    }
    return (
        <div>
            <div className=" Note--border xl:min-h-[120px] min-h-[80px] rounded-md h-fit  pl-2 pr-2 pb-2 bg-[#9ab6dd] hover:cursor-pointer hover:scale-95 text-center pt-3" onClick={handleEdit} >
                <p className=" pr-4 text-white text-xl">{props.text}</p>
            </div>
        </div>
    )
}

export default Note