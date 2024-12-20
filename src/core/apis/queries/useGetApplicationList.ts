import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "../../interceptor"
import { ApiError } from "next/dist/server/api-utils"
import { Application } from "@/jobApp/types/models/Applications"
import { AxiosResponse } from "axios"

export const getApplicationListQuery = async (): Promise<AxiosResponse<Application[]> | undefined> => {
    try {
        const applicationList = await api.get("/applications")
        return applicationList
    } catch (error) {
        console.log("error", error)
        return undefined
    }
}

export const useGetApplicationList = (): UseQueryResult<Application[], ApiError> => {
    return useQuery({
        queryKey: ['application', "applicationList"],
        queryFn: getApplicationListQuery,
    })
}