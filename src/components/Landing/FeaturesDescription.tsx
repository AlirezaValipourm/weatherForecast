import { useTranslations } from 'next-intl'
import React from 'react'
import { RiRobot3Line } from "react-icons/ri";
import { RiNotification2Line } from "react-icons/ri";
import { RiUploadCloud2Line } from "react-icons/ri";

export const FeaturesDescription = () => {
    const t = useTranslations()
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-800 dark:text-slate-100 sm:text-5xl lg:text-balance">{t("feature_title")}</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        <div className="relative pl-16">
                            <dt className="text-base/7 font-semibold text-gray-900 dark:text-slate-100">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <RiUploadCloud2Line size={20} color="white" />
                                </div>
                                {t("resume_upload_title")}
                            </dt>
                            <dd className="mt-2 text-base/7 text-gray-500">{t("resume_upload")}</dd>
                        </div>
                        <div className="relative pl-16">
                            <dt className="text-base/7 font-semibold text-gray-900 dark:text-slate-100">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <RiRobot3Line size={20} color="white" />
                                </div>
                                {t("ai_job_suggestion_title")}
                            </dt>
                            <dd className="mt-2 text-base/7 text-gray-500">{t("ai_job_suggestion")}</dd>
                        </div>
                        <div className="relative pl-16">
                            <dt className="text-base/7 font-semibold text-gray-900 dark:text-slate-100">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <RiNotification2Line size={20} color="white" />
                                </div>
                                {t("job_alert_title")}
                            </dt>
                            <dd className="mt-2 text-base/7 text-gray-500">{t("job_alert")}</dd>
                        </div>

                    </dl>
                </div>
            </div>
        </div>
    )
}
