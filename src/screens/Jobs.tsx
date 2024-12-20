import React, { ChangeEvent, useEffect, useState } from 'react'
import { JobsHeader } from '../components/Jobs/JobsHeader'
import { FilterSidebar } from '../components/Jobs/FilterSidebar'
import { useTranslations } from 'next-intl';
import { WorkTime } from '../types/enums/WorkTime.enum';
import { WorkType } from '../types/enums/WorkType.enum';
import { JobSort } from '../components/Jobs/JobSort';
import { useGetJobList } from '../core/apis/queries/useGetJobList';
import { JobListItem } from '../components/Common/JobListItem';
import { Position } from '../types/models/Position';
import { Pagination } from '../components/Common/Pagination';
import { Loading } from '../components/Common/Loading';

const STATIC_PAGE_SIZE = 10

export const JobsScreen = () => {
    const t = useTranslations()
    const { data: jobData, isLoading, isError } = useGetJobList()
    const data = jobData?.data
    // add states to manage filters
    const [workTimeFilter, setWorkTimeFilter] = useState<Array<WorkTime>>([])
    const [workTypeFilter, setWorkTypeFilter] = useState<Array<WorkType>>([])
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [jobs, setJobs] = useState<Position[]>([])

    useEffect(() => {
        if (data) setJobs(data)
    }, [data])

    useEffect(() => {
        console.log("search", searchQuery)
        if (!data) return
        // filter based on these criteria and calculate filteredJobs
        const filteredJobs = data.filter((pos) =>
            (workTimeFilter.length === 0 || workTimeFilter.includes(pos.workTime)) &&
            (workTypeFilter.length === 0 || workTypeFilter.includes(pos.workType)) &&
            pos.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        // console.log("filteredJobs",filteredJobs)
        setJobs(filteredJobs)
    }, [searchQuery, workTimeFilter, workTypeFilter])

    const workTypeHandler = (type: WorkType) => {
        if (workTypeFilter.includes(type)) {
            // remove from array
            setWorkTypeFilter(workTypeFilter.filter(ty => ty != type))
        } else {
            // add to array
            setWorkTypeFilter([...workTypeFilter, type])
        }
    }

    const workTimeHandler = (time: WorkTime) => {
        if (workTimeFilter.includes(time)) {
            // remove from array
            setWorkTimeFilter(workTimeFilter.filter(ti => ti != time))

        } else {
            // add to array
            setWorkTimeFilter([...workTimeFilter, time])
        }
    }

    const searchQueryHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    return (
        <>
            {/* Header */}
            <JobsHeader />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
                    <div className="col-span-1 lg:col-span-1">
                        <FilterSidebar
                            searchQuery={searchQuery}
                            onSearchQueryChange={searchQueryHandler}
                            workTimeState={workTimeFilter}
                            workTypeState={workTypeFilter}
                            onWorkTimeClick={workTimeHandler}
                            onWorkTypeClick={workTypeHandler}
                        />
                    </div>

                    {/* Job Listings */}
                    <div className="col-span-1 lg:col-span-3">
                        {/* Sort Controls */}
                        <div className="flex items-center justify-between dark:bg-slate-700 p-4 rounded-lg shadow-sm border border-gray-200">
                            <span className="text-sm text-gray-600 dark:text-slate-100">{jobs.length} {t("jobs_found")}</span>
                        </div>

                        {/* Job Cards */}
                        <div className="space-y-4 mt-4">
                            {isLoading ? <div className='w-full flex justify-center items-center'><Loading size='full'/></div> : jobs.slice((currentPage - 1) * STATIC_PAGE_SIZE, currentPage * STATIC_PAGE_SIZE).map(pos => <JobListItem key={pos.id} job={pos} />)}
                            {!isLoading && jobs.length == 0 && <div>{t("nothing_to_show")}</div>}
                        </div>

                        {/* Pagination */}
                        {jobs.length > 0 && <div className=" mt-4 flex items-center justify-between dark:bg-slate-700 px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil((jobs?.length ?? 0) / 10)}
                                onPageChange={setCurrentPage}
                                siblingCount={1}
                            />
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
