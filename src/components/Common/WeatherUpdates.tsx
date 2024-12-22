import { useGetWeatherAlert } from '@/weatherForecast/core/apis/queries/useWeatherAlert'
import { LocationData } from '@/weatherForecast/types/models/Location'
import { WeatherAlert } from '@/weatherForecast/types/models/Weather'
import { useEffect, FC } from 'react'
import { Loading } from './Loading'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

interface IWeatherUpdatesProps {
  location: LocationData
}

export const WeatherUpdates: FC<IWeatherUpdatesProps> = ({ location }) => {
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { data, isLoading } = useGetWeatherAlert(location)
  const updates = data?.data.alerts as WeatherAlert[];
  useEffect(() => {
    const interval = setInterval(() => {
      // Retech alerts for weather according to current location
      queryClient.invalidateQueries({
        queryKey: ["alert"]
      })
    }, 60 * 1000) // Refetch data every 1 minutes

    return () => clearInterval(interval)
  }, [])

  if (isLoading) return <div className="fixed bottom-4 right-4">
    <Loading size='lg' />
  </div>

  return (
    <div className="">
      <h3 className='text-2xl mb-4 text-black dark:text-gray-500'>{t("weather_alerts")}</h3>
      {updates.length > 0 ? updates.map((update, index) => (
        <div
          key={index}
          className="bg-grey-100 border-s-4 border-yellow-500 p-4 mb-2"
        >
          <div className='text-gray-800 dark:text-gray-300'>{update.title}</div>
          <div className='text-gray-700 dark:text-gray-400'>{`severity : ${update.severity}`}</div>
          <p className='text-gray-600 dark:text-gray-500'>
            {update.description}
          </p>
        </div>
      )) : <p className='text-black dark:text-gray-500'>{t("no_alerts")}</p>}
    </div>
  )
}