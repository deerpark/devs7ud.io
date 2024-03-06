export type Theme = "light" | "dark"

export interface UserState {
  userName: string
}

export interface UserStateAction {
  setUserName: (name: string) => void
}

export interface UserStore extends UserState, UserStateAction {}

export interface ThemeStateAction {
  toggleTheme: () => void
}

export interface ThemeState {
  theme: Theme
}

export interface ThemeStore extends ThemeState, ThemeStateAction {}
