import { Position } from '@/jobApp/types/models/Position'
import { useTranslations } from 'next-intl';
import React, { FC } from 'react'
import { RiUserLocationLine } from "react-icons/ri";
import { RiTimeFill } from "react-icons/ri";
import { RiBriefcase2Fill } from "react-icons/ri";

interface IJobCardProps {
    position:Position
}

export const JobCard:FC<IJobCardProps> = ({position}) => {
    const t = useTranslations()
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full border border-gray-200 dark:border-gray-700">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                    {t(position.category)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {position.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {position.description}
                </p>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <RiUserLocationLine size={18} className="mr-2" />
                        <span className="text-sm">{position.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <RiBriefcase2Fill size={18} className="mr-2" />
                        <span className="text-sm">{t(position.workType)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <RiTimeFill size={18} className="mr-2" />
                        <span className="text-sm">{t(position.workTime)}</span>
                    </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 text-sm font-medium">
                    {t("apply")}
                </button>
            </div>
        </div>
    )
}
