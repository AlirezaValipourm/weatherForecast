import { useMutation } from "@tanstack/react-query"
import { ApplicationForm } from "@/jobApp/types/models/Applications"
import { getApplicationListQuery } from "../queries/useGetApplicationList";
import { api } from "../../interceptor";

const getJobByIdQuery = async (data: ApplicationForm) => {
    try {
        const appList = await getApplicationListQuery();
        if (appList == undefined) throw new Error("unknown_error")
        // check if an application with this application already exists
        const alreadyApplied = appList.data.findIndex(app => app.email == data.email && app.positionId == data.positionId) > -1
        if (alreadyApplied) {
            throw new Error("already_applied")
        } else {
            // apply and send application
            const applicationList = await api.post("/applications", data)
            return applicationList
        }
    } catch (error) {
        console.log("error", error)
        throw error
    }
}

export const useApplyForPosition = () => {
    return useMutation({
        mutationKey: ['apply', "jobId"],
        mutationFn: (data: ApplicationForm) => getJobByIdQuery(data)
    })
}
