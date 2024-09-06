import { ThemeType } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type SetType = (partial: StoreState | Partial<StoreState> | ((state: StoreState) => StoreState | Partial<StoreState>), replace?: boolean | undefined) => void

interface StoreState {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const initialState: Pick<StoreState, 'theme'> = {
  theme: 'light',
}

const initialActions = (set: SetType) => ({
  setTheme: (theme: ThemeType) => set({ theme }),
})

const useStoreBase = create<StoreState>()(
  persist(
    (set) => ({
      ...initialState,
      ...initialActions(set),
    }),
    {
      name: 'des7ud.io', // 스토리지에 저장될 때 사용될 키 이름
      storage: createJSONStorage(() => localStorage), // 사용할 스토리지 메커니즘
    }
  )
)

const useStore = typeof window !== 'undefined' ? useStoreBase : create<StoreState>((set) => ({
  ...initialState,
  ...initialActions(set),
}))

export default useStore