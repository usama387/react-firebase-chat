import { create } from "zustand";
import { database } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    // action
    fetchUserInfo: async (uid) => {
        // when there is no uid => userId
        if (!uid) return set({ currentUser: null, isLoading: false });

        try {

            // to reach username and avatar
            const docRef = doc(database, "users", uid)
            const docSnap = await getDoc(docRef)
            // when user exists update the currentUser with set from zustand
            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false })
            } else {
                set({ currentUser: null, isLoading: false })
            }
        } catch (error) {
            console.log(error)
            if (!uid) return set({ currentUser: null, isLoading: false });

        }
    }
}))