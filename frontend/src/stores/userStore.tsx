import { create } from "zustand";
type UserDataT = {
    email: string,
    id: string,
    name: string
}

export const useUser = create((set) => ({
    userData: {},
    setUserData: (user: UserDataT) => {
        set({ userData: user })
    }
}))