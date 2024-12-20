import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "../../interceptor"
import { ApiError } from "next/dist/server/api-utils"
import { Position } from "@/jobApp/types/models/Position"
import { AxiosResponse } from "axios"

const getJobByIdQuery = async (id: string): Promise<AxiosResponse<Position> | undefined> => {
    try {
        const jobList = await api.get(`/positions/${id}`)
        console.log("jobList", jobList)
        return jobList
    } catch (error) {
        console.log("error", error)
        return undefined
    }
}

export const useGetJobById = (id: string) => {
    return useQuery({
        queryKey: ['job', "jobById", id],
        queryFn: () => getJobByIdQuery(id),
        enabled: !!id
    })
}
