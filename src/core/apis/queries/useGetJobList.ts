import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "../../interceptor"
import { ApiError } from "next/dist/server/api-utils"
import { Position } from "@/jobApp/types/models/Position"
import { AxiosResponse } from "axios"

const getJobListQuery = async (): Promise<AxiosResponse<Position[]> | undefined> => {
    try {
        const jobList = await api.get("/positions")
        console.log("jobList", jobList)
        return jobList
    } catch (error) {
        console.log("error", error)
        return undefined
    }
}

export const useGetJobList = () => {
    return useQuery({
        queryKey: ['job', "jobList"],
        queryFn: getJobListQuery,
    })
}