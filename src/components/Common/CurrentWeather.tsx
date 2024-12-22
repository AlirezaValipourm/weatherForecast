import { FC } from 'react';
import { useCurrentLocation } from '@/weatherForecast/core/apis/queries/useCurrentLocation';
import { useGetCurrentWeather } from '@/weatherForecast/core/apis/queries/useCurrentWeather';
import { GeoData, LocationData } from '@/weatherForecast/types/models/Location';
import { TemperatureUnit, WeatherData } from '@/weatherForecast/types/models/Weather';
import Image from 'next/image';
import { convertToFahrenheit } from '@/weatherForecast/core/utils/convertToFahrenheit';
import { useTranslations } from 'next-intl';

interface CurrentWeatherProps {
  location: LocationData;
  unit: TemperatureUnit;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({ location, unit }) => {
  const t = useTranslations()
  const { data, isLoading } = useGetCurrentWeather(location)
  const { data: locationData, isLoading: isLocationLoading } = useCurrentLocation(location)

  const getLocation = locationData?.data.results[0] as GeoData;
  const weather = data?.data.data[0] as WeatherData;

  if (isLoading) return <div className="text-center">{t("loading_weather")}</div>
  if (!weather) return null

  const temperature = unit === 'C' ? weather.temp : convertToFahrenheit(weather.temp)

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-gray-300">{isLocationLoading ? t("current_weather") : [getLocation.components.continent, getLocation.components.country, getLocation.components.state, getLocation.components.city].join(", ")}</h2>
          <p className="text-gray-500">{new Date().toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-black dark:text-gray-300">
            {temperature}°{unit}
          </p>
          <p className="text-lg text-black dark:text-gray-300 flex gap-2 items-center">
            {weather.weather.description}
            {weather.weather.icon && <Image alt='weather icon' src={`https://cdn.weatherbit.io/static/img/icons/${weather.weather.icon}.png`} width={40} height={40} />}
          </p>
        </div>
      </div>
    </div>
  )
}