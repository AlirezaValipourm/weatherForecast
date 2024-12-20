import { Item } from "./Item";

export type Application = {
    id: string;
    createdAt: Date;
    lastName: string;
    firstName: string;
    email: string;
    yoe: number;
    skills: Array<Item>;
    phone: string
    positionId: string
}

// id must be generated on the server
export type ApplicationForm = Omit<Application, "id">