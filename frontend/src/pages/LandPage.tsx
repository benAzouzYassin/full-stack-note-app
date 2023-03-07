import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Note from "../components/Note"
import Navbar from "../components/Navbar"
import { NoteT, useNote } from "../stores/notesStore"
import useProtect from "../hooks/useProtect"
function LandPage() {
    useProtect()
    const Navigate = useNavigate()
    const setNotes = useNote((state: any) => state.setNotes)
    const notes = useNote((state: any) => state.notes)
    const deleteAllNotes = useNote((state: any) => state.deleteAllNotes)

    useEffect(() => {
        axios.get("http://localhost:8000/api/notes/", { headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` } })
            .then(data => setNotes(data.data))
            .catch(err => setNotes([]))
    }, [])

    const handleCreate = () => {
        Navigate("/create")
    }

    const handleDeleteAll = () => {
        deleteAllNotes()
        //should delete all  notes from data base using a new endpoint  
    }
    return (

        <div className="bg-[#ffffe0] h-screen">
            <Navbar />
            <button className=" ml-2 xl:ml-44 mt-4  bg-green-800 hover:bg-green-700 text-white p-2 rounded-md" onClick={handleCreate}>Create Note</button>
            <button className=" mt-4 ml-3 bg-red-800 hover:bg-red-700 text-white p-2 rounded-md" onClick={handleDeleteAll}>Delete all Notes</button>
            <div className="grid xl:pr-40 xl:pl-40 xl:grid-cols-4 grid-cols-2 ml-3 mr-2 mt-10 gap-2" >
                {notes.map((note: NoteT) => <Note key={note._id} id={note._id} text={note.text} />)}
            </div>
        </div>)

}

export default LandPage