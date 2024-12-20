import { Position } from '@/jobApp/types/models/Position'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { FC } from 'react'
import { RiUserLocationLine } from "react-icons/ri";
import { RiTimeFill } from "react-icons/ri";
import { RiBriefcase2Fill } from "react-icons/ri";

interface IJobListItemProps {
    job: Position

}

export const JobListItem: FC<IJobListItemProps> = ({ job }) => {
    const t = useTranslations()
    const router = useRouter()

    const handleClick = () => {
        router.push(`./jobs/${job.id}`)
    }

    return (
        <div
            key={job.id}
            className="p-6 rounded-lg shadow-sm border dark:bg-slate-700 border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold black">{job.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-slate-100">{job.company}</p>
                        </div>
                    </div>

                    <p className="mt-2 text-gray-600 text-sm line-clamp-2 dark:text-slate-100">{job.description}</p>

                    <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center text-gray-600 dark:text-slate-200">
                            <RiUserLocationLine size={18} className="mr-1.5" />
                            <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-slate-200">
                            <RiBriefcase2Fill size={18} className="mr-1.5" />
                            <span className="text-sm">{t(job.workType)}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-slate-200">
                            <RiTimeFill size={18} className="mr-1.5" />
                            <span className="text-sm">{t(job.workTime)}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <button onClick={handleClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 text-sm font-medium">
                            {t("apply")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
