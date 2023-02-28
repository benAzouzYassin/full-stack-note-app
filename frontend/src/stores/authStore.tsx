import { create } from 'zustand'
export type AuthStateT = {
    loggedIn: boolean,
    login: (token: string) => void,
    logout: () => void
}
export const useAuth = create<AuthStateT>((set) => ({
    loggedIn: false,
    login: async (token: string) => {
        localStorage.setItem("jwt", token)
        set({ loggedIn: true })
    },

    logout: () => set(() => {
        localStorage.removeItem("jwt")
        return { loggedIn: false }
    }),


}))


