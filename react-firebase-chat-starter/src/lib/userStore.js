import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));

// import { doc, getDoc } from "firebase/firestore";
// import { create } from "zustand";
// import { db } from "./firebase";

// export const useUserStore = create((set) => ({
//   currentUser: null,
//   isLoading: true,
//   fetchUserInfo: async (uid) => {
//     if (!uid) {
//       console.log("No UID provided");
//       return set({ currentUser: null, isLoading: false });
//     }

//     try {
//       console.log("Fetching user info for UID:", uid);
//       const docRef = doc(db, "users", uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         console.log("User data found:", docSnap.data());
//         set({ currentUser: docSnap.data(), isLoading: false });
//       } else {
//         console.log("No user data found for UID:", uid);
//         set({ currentUser: null, isLoading: false });
//       }
//     } catch (err) {
//       console.log("Error fetching user data:", err);
//       set({ currentUser: null, isLoading: false });
//     }
//   },
// }));
