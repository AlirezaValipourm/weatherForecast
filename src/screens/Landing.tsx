import React from 'react'
import { HeroSection } from '../components/Landing/HeroSection'
import { FeaturesDescription } from '../components/Landing/FeaturesDescription'
import { JobListCarousel } from '../components/Landing/JobListCarousel'


export const Landing = () => {
    return (
        <>
            <HeroSection />
            <FeaturesDescription />
            <JobListCarousel />
        </>
    )
}
