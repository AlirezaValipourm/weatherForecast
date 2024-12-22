import { useGetWeeklyForecast } from '@/weatherForecast/core/apis/queries/useWeeklyForecast';
import { convertToFahrenheit } from '@/weatherForecast/core/utils/convertToFahrenheit';
import { LocationData } from '@/weatherForecast/types/models/Location';
import { ForecastDayData, TemperatureUnit } from '@/weatherForecast/types/models/Weather';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react'

interface WeeklyForecastProps {
    location: LocationData;
    unit: TemperatureUnit;
}

export const WeeklyForecast: FC<WeeklyForecastProps> = ({ location, unit }) => {
    const t = useTranslations()
    const { data, isLoading } = useGetWeeklyForecast(location)
    const forecast = data?.data.data;
    if (isLoading) return <div className="text-center">{t("loading_forecast")}</div>
    if (!forecast) return null

    return (
        <div className="flex flex-wrap justify-between gap-4">
            {forecast.map((day: ForecastDayData, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 min-w-[200px]">
                    <p className="font-bold text-gray-900 dark:text-gray-600">{new Date(day.valid_date).toLocaleDateString()}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-600">
                        {unit === 'C' ? day.temp : convertToFahrenheit(Number(day.temp))}°{unit}
                    </p>
                    <p className="text-lg text-black dark:text-gray-300 flex gap-2 items-center">
                        {day.weather.description}
                        {day.weather.icon && <Image alt='weather icon' src={`https://cdn.weatherbit.io/static/img/icons/${day.weather.icon}.png`} width={40} height={40} />}
                    </p>
                </div>
            ))}
        </div>
    )
}