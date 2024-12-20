import React from 'react'
import { Carousel } from '../Common/Carousel'
import { JobCard } from '../Common/JobCard'
import { useGetJobList } from '@/jobApp/core/apis/queries/useGetJobList'
import { useUserPreferencesStore } from '@/jobApp/stores/UserStore/UserPreferences.provider'

export const JobListCarousel = () => {
    const { data, isLoading, isError } = useGetJobList()
    const locale = useUserPreferencesStore(store => store.lang)
    return (
        <div className='px-6'>
            {data && !isLoading && <Carousel
                dir={locale.includes("en") ? "ltr" : "rtl"}
                slides={data.data.map(pos => <JobCard position={pos} />)}
            />}
        </div>
    )
}
