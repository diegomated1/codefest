import { IUserGet } from "interfaces/user/IUserGet";

export interface IGroupGet  {
    id: string;
    name: string;
    description: string;
    rate: number;
    created_date: Date;
    participants: IUserGet[]
}