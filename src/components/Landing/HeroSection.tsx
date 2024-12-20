import React from 'react'
import Hero from "@/jobApp/assets/images/hero.webp"
import { useTranslations } from 'next-intl'
import Image from 'next/image'
export const HeroSection = () => {
    const t = useTranslations()

    return (
        <div className="relative isolate w-full h-[650px]">
            <div className="w-full h-full absolute z-[-1]">
                <Image src={Hero} alt="Hero svg" fill />
            </div>
            <div className="mx-auto max-w-2xl z-10 mt-16">
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl w-full">{t("discover_jobs")}</h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">{t("apply_description")}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{t("available_positions")}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
