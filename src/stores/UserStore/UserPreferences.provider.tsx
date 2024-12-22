'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { UserPreferencesStore, createUserPreferencesStore } from '@/weatherForecast/stores/UserStore/UserPreferences.store'

export type UserPreferenceStoreApi = ReturnType<typeof createUserPreferencesStore>
export const UserPreferencesStoreContext = createContext<UserPreferenceStoreApi | undefined>(
    undefined,
)

export interface UserPreferencesStoreProviderProps {
    children: ReactNode
}


export const UserPreferencesStoreProvider = ({
    children,
}: UserPreferencesStoreProviderProps) => {
    const storeRef = useRef<UserPreferenceStoreApi>()
    if (!storeRef.current) {
        storeRef.current = createUserPreferencesStore()
    }

    return (
        <UserPreferencesStoreContext.Provider value={storeRef.current} >
            {children}
        </UserPreferencesStoreContext.Provider>
    )
}


export const useUserPreferencesStore = <T,>(
    selector: (store: UserPreferencesStore) => T,
): T => {
    const userPreferencesStoreContext = useContext(UserPreferencesStoreContext)

    if (!userPreferencesStoreContext) {
        throw new Error(`userPreferencesStore must be used within UserPreferencesStoreProvider`)
    }

    return useStore(userPreferencesStoreContext, selector)
}