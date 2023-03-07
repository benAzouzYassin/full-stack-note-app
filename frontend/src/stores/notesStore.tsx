import axios from "axios";
import { create } from "zustand";

export type NoteT = {
    _id: string,
    text: string,
    user: string
    _v: number
}

export type NotesState = {
    notes?: NoteT[]
    setNotes: () => void,
    deleteAllNotes: () => void
}

export const useNote = create((set) => ({
    notes: [],
    setNotes: (notesArr: NoteT[]) => {
        set({ notes: notesArr })
    },
    deleteAllNotes: () => {
        axios.delete("http://localhost:8000/api/notes/all", { headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` } })
            .then(() => set({ notes: [] }))
            .catch(err => console.error(err))

    }
}))
