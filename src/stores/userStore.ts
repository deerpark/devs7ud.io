import { UserStore } from "@/interfaces/store.interface"
import { userActions } from "./actions/userActions"
import { persist } from "zustand/middleware"
import { create } from "zustand"

export const useUserStore = create(
  persist<UserStore>(
    (set, get, store) => ({
      userName: "",
      ...userActions(set, get, store),
    }),
    {
      name: "user-store",
    }
  )
)
