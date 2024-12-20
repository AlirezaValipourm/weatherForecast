import { useTranslations } from 'next-intl'
import React from 'react'

export const JobsHeader = () => {
    const t = useTranslations()
    return (
        <div className=" border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{t("find_job")}</h1>
                <p className="mt-2 text-gray-500">{t("discover_opportunities")}</p>
            </div>
        </div>
    )
}
