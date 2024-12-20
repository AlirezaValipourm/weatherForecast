import { Category } from "../enums/Category.enum";
import { WorkTime } from "../enums/WorkTime.enum";
import { WorkType } from "../enums/WorkType.enum";

export type Position = {
    id:string;
    createdAt:Date;
    title:string;
    description:string;
    dueDate:Date
    location:string,
    workType:WorkType
    workTime:WorkTime
    category:Category
    company:string
}