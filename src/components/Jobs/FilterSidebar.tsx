import React, { ChangeEvent, FC } from 'react'
import { FilterButton } from '../Common/FilterButton';
import { useTranslations } from 'next-intl';
import { WorkType } from '@/jobApp/types/enums/WorkType.enum';
import { WorkTime } from '@/jobApp/types/enums/WorkTime.enum';
import { CustomInput } from '../Common/CustomInput';

interface IFilterSidebarProps {
    workTypeState: Array<WorkType>,
    workTimeState: Array<WorkTime>
    onWorkTypeClick: (type: WorkType) => void
    onWorkTimeClick: (time: WorkTime) => void
    searchQuery: string
    onSearchQueryChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FilterSidebar: FC<IFilterSidebarProps> = ({ onWorkTimeClick, onWorkTypeClick, workTimeState, workTypeState, searchQuery, onSearchQueryChange }) => {

    const t = useTranslations()

    return (
        <div className="space-y-6">
            <div className="dark:bg-slate-700 p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-6">
                    {/* Search */}
                    <div className="relative">
                        <CustomInput 
                            type='text'
                            value={searchQuery}
                            name='search'
                            onChange={onSearchQueryChange}
                            placeHolder={t("search_jobs")}
                        />
                    </div>

                    {/* Work Type Filter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 dark:text-slate-100">{t("work_type")}</h3>
                        <div className="flex gap-3 flex-wrap">
                            <FilterButton isSelected={workTypeState.includes(WorkType.Remote)} label={t(WorkType.Remote)} onClick={() => onWorkTypeClick(WorkType.Remote)} />
                            <FilterButton isSelected={workTypeState.includes(WorkType.Hybrid)} label={t(WorkType.Hybrid)} onClick={() => onWorkTypeClick(WorkType.Hybrid)} />
                            <FilterButton isSelected={workTypeState.includes(WorkType.onSite)} label={t(WorkType.onSite)} onClick={() => onWorkTypeClick(WorkType.onSite)} />
                        </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 dark:text-slate-100">{t("location")}</h3>
                        <div className="flex gap-3 flex-wrap">
                            <FilterButton isSelected={workTimeState.includes(WorkTime.Contract)} label={t(WorkTime.Contract)} onClick={() => onWorkTimeClick(WorkTime.Contract)} />
                            <FilterButton isSelected={workTimeState.includes(WorkTime.FullTime)} label={t(WorkTime.FullTime)} onClick={() => onWorkTimeClick(WorkTime.FullTime)} />
                            <FilterButton isSelected={workTimeState.includes(WorkTime.PartTime)} label={t(WorkTime.PartTime)} onClick={() => onWorkTimeClick(WorkTime.PartTime)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
