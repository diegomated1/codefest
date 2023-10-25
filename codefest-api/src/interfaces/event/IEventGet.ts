import { ICommentGet } from "interfaces/comments/ICommentGet"
import { IGroupGet } from "interfaces/group/IGruoupGet"

export interface IEventGet {
    user_id: string
    name: string
    description: string
    mainImagePath: string
    dateInit : Date
    dateFinal : Date
    location : string
    groups: IGroupGet[]
    comments: ICommentGet[]
}