import { ThemeStore, ThemeStateAction } from "@/interfaces/store.interface"
import { StateCreator } from "zustand"

export const themeActions: StateCreator<
  ThemeStore,
  [],
  [],
  ThemeStateAction
> = (set) => ({
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
})
