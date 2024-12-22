// import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { api } from "../../interceptor"
import { GeocodeResult, LocationData } from "@/weatherForecast/types/models/Location"
import { useMutation, useQuery } from "@tanstack/react-query"

const getSearchLocation = async (query: string): Promise<AxiosResponse<GeocodeResult> | undefined> => {
    try {
        if (query.length > 1) {
            const locationData = await api.get(`/json?q=${encodeURIComponent(query)}`, {
                baseURL: process.env.NEXT_PUBLIC_GEOLOCATION_API_BASE_URL,
            })
            console.log("locationData", locationData)
            return locationData
        }
    } catch (error) {
        console.log("error", error)
        return undefined
    }
}

export const useSearchLocation = () => {
    return useMutation({
        mutationKey: ['weather', "location"],
        mutationFn: (query: string) => getSearchLocation(query),

    })
}