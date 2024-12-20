import React from 'react';
import { useMainLayout } from '@/jobApp/hooks/Layout/useMainLayout';
import { JobsScreen } from '@/jobApp/screens/Jobs';

const JobList = () => {
    return (
        <div className="min-h-screen">
            <JobsScreen />
        </div>
    );
};

export default useMainLayout(JobList);