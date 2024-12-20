import { useTranslations } from 'next-intl'
import React from 'react'
import { RiFilter2Line } from 'react-icons/ri'

export const JobSort = () => {
    const t = useTranslations()
    return (
        <div className="flex items-center space-x-2">
            <RiFilter2Line className="h-5 w-5 text-gray-500 dark:text-slate-100" />
            <span className="text-sm text-gray-600 dark:text-slate-100">{t("sort")}:</span>
            <select className="text-md border-0 focus:ring-0 select select-bordered text-black dark:text-slate-100">
                <option>{t("most_recent")}</option>
                <option>{t("high_low")}</option>
                <option>{t("low_high")}</option>
            </select>
        </div>)
}
