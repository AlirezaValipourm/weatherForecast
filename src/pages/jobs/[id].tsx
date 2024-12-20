import { useMainLayout } from '@/jobApp/hooks/Layout/useMainLayout'
import { ApplyJobScreen } from '@/jobApp/screens/ApplyJob'
import React from 'react'

const ApplyJob = () => {
    return (
        <div>
            <ApplyJobScreen />
        </div>
    )
}

export default useMainLayout(ApplyJob)
