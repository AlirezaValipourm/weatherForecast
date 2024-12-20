'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useUserPreferencesStore } from '../../stores/UserStore/UserPreferences.provider'
import { Lang } from '../../types/models/UserPreferences'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function LocaleSwitcher() {
    const t = useTranslations()
    const router = useRouter()
    const pathname = usePathname()
    const lang = useUserPreferencesStore(store => store.lang)
    const changeLang = useUserPreferencesStore(store => store.changeLang)

    useEffect(() => {
        console.log("lang",lang)
    },[lang])

    const handleLocaleChange = (newLocale: string) => {
        const newPath = pathname.replace(`/${lang}/`, `/${newLocale}/`)
        changeLang(newLocale as Lang)
        router.push(newPath)
    }

    return (
        <select className="select select-bordered max-w-xs dark:text-white" value={lang} onChange={(e) => handleLocaleChange(e.target.value)}>
            {/* <option disabled selected>Who shot first?</option> */}
            <option value="en-US">{t("english")}</option>
            <option value="fa-IR">{t("persian")}</option>
        </select>
    )
}