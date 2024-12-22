import { AxiosResponse } from "axios"
import { api } from "../../interceptor"
import { LocationData } from "@/weatherForecast/types/models/Location"
import { useQuery } from "@tanstack/react-query"
import { ForecastDayData } from "@/weatherForecast/types/models/Weather"

const getWeeklyForecast = async (location: LocationData): Promise<AxiosResponse<any> | undefined> => {
    try {
        const currentWeather = await api.get(`/forecast/daily?lat=${location.lat}&lon=${location.lon}`)

        const filteredData = {
            ...currentWeather,
            data: {
                ...currentWeather.data,
                data: currentWeather.data.data.slice(0, 7) as ForecastDayData[]
            }
        }
        // console.log("forecast", filteredData)
        return filteredData
    } catch (error) {
        console.log("error", error)
        return undefined
    }
}

export const useGetWeeklyForecast = (location: LocationData) => {
    return useQuery({
        queryKey: ['weather', "weeklyForecast", location.lat, location.lon],
        queryFn: () => getWeeklyForecast(location),
    })
}