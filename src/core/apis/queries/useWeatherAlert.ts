// import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { api } from "../../interceptor"
import { LocationData } from "@/weatherForecast/types/models/Location"
import { useQuery } from "@tanstack/react-query"

const getWeatherAlerts = async (location: LocationData): Promise<AxiosResponse<any> | undefined> => {
    try {
        const weatherAlert = await api.get(`/alerts?lat=${location.lat}&lon=${location.lon}`)
        console.log("current alert", weatherAlert)
        return weatherAlert
    } catch (error) {
        console.log("error", error)
        return undefined
    }
}

export const useGetWeatherAlert = (location: LocationData) => {
    return useQuery({
        queryKey: ['weather', "current", "alert", location.lat, location.lon],
        queryFn: () => getWeatherAlerts(location),
        enabled: Boolean(location)
    })
}