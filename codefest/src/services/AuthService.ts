import { AxiosError } from "axios";
import { IResponse, axios } from "./axiosInstance";

export class AuthService {

    public static login = (email: string, password: string) : Promise<IResponse<string>> => {
        return new Promise(async(res, rej)=>{
            try{
                const { data } = await axios.post<IResponse<string>>("/auth/sesion", {email, password});
                res(data);
            }catch(err){
                if(err instanceof AxiosError && err.response?.data){
                    res(err.response.data);
                    return;
                }else{
                    rej(err); 
                }
            }
        });
    }

    public static register = (user: IUserPost) : Promise<IResponse<string>> => {
        return new Promise(async(res, rej)=>{
            try{
                const { data } = await axios.post<IResponse<string>>("/auth/register", {"User": user});
                res(data);
            }catch(err){
                if(err instanceof AxiosError && err.response?.data){
                    res(err.response.data);
                    return;
                }else{
                    rej(err); 
                }
            }
        });
    }
    
}
