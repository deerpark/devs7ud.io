import { ThemeStore } from "@/interfaces/store.interface"
import { themeActions } from "./actions/themeActions"
import { persist } from "zustand/middleware"
import { create } from "zustand"

export const useThemeStore = create(
  persist<ThemeStore & ReturnType<typeof themeActions>>(
    (set, get, store) => ({
      theme: "light",
      ...themeActions(set, get, store),
    }),
    {
      name: "theme-store",
    }
  )
)
