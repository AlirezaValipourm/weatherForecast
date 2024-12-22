// import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { api } from "../../interceptor"
import { LocationData } from "@/weatherForecast/types/models/Location"
import { useQuery } from "@tanstack/react-query"

const getCurrentWeather = async (location: LocationData): Promise<AxiosResponse<any> | undefined> => {
    try {
        const currentWeather = await api.get(`/current?lat=${location.lat}&lon=${location.lon}`)
        console.log("currentWeather", currentWeather)
        return currentWeather
    } catch (error) {
        console.log("error", error)
        return undefined
    }
}

export const useGetCurrentWeather = (location: LocationData) => {
    return useQuery({
        queryKey: ['weather', "current", location.lat, location.lon],
        queryFn: () => getCurrentWeather(location),
        enabled: Boolean(location)
    })
}