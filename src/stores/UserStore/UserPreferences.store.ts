'use client'

import { createStore } from 'zustand/vanilla'
import { Lang, Theme, UserPreferences } from "@/jobApp/types/models/UserPreferences"
// import { getUserBrowserLang } from '../../utils/getUserBrowserLang'
import { persist, createJSONStorage } from 'zustand/middleware'

import { create } from 'zustand'
import { useUserPreferencesStore } from './UserPreferences.provider'

// store types
export type UserActions = {
    changeTheme: (theme: Theme) => void
    changeLang: (lang: Lang) => void
}
export type UserPreferencesStore = UserPreferences & UserActions

export const defaultInitState: UserPreferences = {
    lang: "en-US",
    theme: 'light'
}

export const createUserPreferencesStore = (
    initState: UserPreferences = defaultInitState,
) => {
    return create<UserPreferencesStore>()(
        persist((set) => ({
            ...initState,
            changeLang(lang) {
                set((state) => ({ ...state, lang: lang }))
            },
            changeTheme(theme) {
                set((state) => ({ theme: theme }))
            }
        }),
            {
                name: "userPereferencePersist",
                storage: createJSONStorage(() => sessionStorage),
                partialize: (state) => ({
                    lang: state.lang,
                    theme: state.theme
                }),
            })
    )
}

export const useTheme = () => useUserPreferencesStore((state) => state.theme)
export const useLang = () => useUserPreferencesStore((state) => state.lang)
