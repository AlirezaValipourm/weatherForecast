import { AxiosResponse } from "axios"
import { api } from "../../interceptor"
import { LocationData } from "@/weatherForecast/types/models/Location"
import { useQuery } from "@tanstack/react-query"

const getCurrentLocation = async (location: LocationData): Promise<AxiosResponse<any> | undefined> => {
    try {
        const queryString = `${location.lat},${location.lon}`
        const locationData = await api.get(`/json?q=${encodeURIComponent(queryString)}`, {
            baseURL: process.env.NEXT_PUBLIC_GEOLOCATION_API_BASE_URL,
        })
        console.log("locationData", locationData)
        return locationData
    } catch (error) {
        console.log("error", error)
        return undefined
    }
}

export const useCurrentLocation = (location: LocationData) => {
    return useQuery({
        queryKey: ['weather', "location", location.lat, location.lon],
        queryFn: () => getCurrentLocation(location),
        enabled: Boolean(location)
    })
}