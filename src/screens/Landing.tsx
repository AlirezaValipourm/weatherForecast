import { useEffect, useState } from "react"
import { TemperatureUnit } from "../types/models/Weather"
import { LocationData } from "../types/models/Location"
import ErrorBoundary from "../components/Common/ErrorBoundary"
import { UnitToggle } from "../components/Common/UnitToggle"
import { CurrentWeather } from "../components/Common/CurrentWeather"
import { WeeklyForecast } from "../components/Common/WeeklyForecast"
import { WeatherUpdates } from "../components/Common/WeatherUpdates"
import { LocationSearch } from "../components/Common/LocationSearch"
import { useQueryClient } from "@tanstack/react-query"
import { Loading } from "../components/Common/Loading"
import { useTranslations } from "next-intl"

export const Landing = () => {
    const queryClient = useQueryClient();
    const t = useTranslations()
    const [location, setLocation] = useState<LocationData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showForecast, setShowForecast] = useState<boolean>(false)
    const [unit, setUnit] = useState<TemperatureUnit>('C')

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    })
                },
                (error) => {
                    setError(t("geoerror"))
                }
            )
        } else {
            setError("")
        }
    }, [])

    const handleLocationChange = (locationData: LocationData) => {
        setLocation(locationData)
    }

    const handleUpdate = () => {
        queryClient.invalidateQueries({
            queryKey:["weather"]
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ErrorBoundary>
                <div className="space-y-8 w-full">
                    <header className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-gray-300">{t("weather_forecast")}</h1>
                        <div className="flex justify-start gap-4">
                            <UnitToggle unit={unit} setUnit={setUnit} />
                            <button className="btn" onClick={handleUpdate}>{t("update")}</button>
                        </div>
                    </header>

                    <LocationSearch
                        setLocation={handleLocationChange}
                    />

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {location && (
                        <>
                            <CurrentWeather location={location} unit={unit} />

                            <div className="text-center">
                                <button
                                    onClick={() => setShowForecast(!showForecast)}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    {showForecast ? t('hide') : t('show')} {t("week_forecast")}
                                </button>
                            </div>

                            {showForecast && <WeeklyForecast location={location} unit={unit} />}
                        </>
                    )}

                    {location ? <WeatherUpdates location={location} /> : <Loading size="lg" />}
                </div>
            </ErrorBoundary>
        </div>
    )
}