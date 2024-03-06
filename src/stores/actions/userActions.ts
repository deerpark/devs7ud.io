import { UserStore, UserStateAction } from "@/interfaces/store.interface"
import { StateCreator } from "zustand"

export const userActions: StateCreator<UserStore, [], [], UserStateAction> = (
  set
) => ({
  setUserName: (name: string) => set(() => ({ userName: name })),
})
