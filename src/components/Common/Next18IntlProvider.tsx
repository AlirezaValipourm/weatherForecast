import { NextIntlClientProvider } from 'next-intl';
import { FC, ReactNode, useEffect } from 'react';
import enMessages from '../../libs/locales/en-US/common.json';
import faMessages from '../../libs/locales/fa-IR/common.json';
import { useUserPreferencesStore } from '@/jobApp/stores/UserStore/UserPreferences.provider';

interface INextIntlProviderProps {
    children: ReactNode
}

// there are better ways to manage locale messages but it is not the main purpose of this task
const messages = {
    "en-US": enMessages,
    "fa-IR": faMessages,
};

export const NextIntlProvider: FC<INextIntlProviderProps> = ({ children }) => {
    // get locale from zustand
    const locale = useUserPreferencesStore(store => store.lang)
    useEffect(() => {
        const isLtr = locale?.includes("en") ? true : false
        document.documentElement.dir = isLtr ? "ltr" : "rtl"
    }, [
        locale
    ])
    return <NextIntlClientProvider
        locale={locale}
        timeZone={locale == "en-US" ? "America/New_York" : "Asia/Tehran"}
        messages={messages[locale]}
    >
        {children}
    </NextIntlClientProvider>
}
