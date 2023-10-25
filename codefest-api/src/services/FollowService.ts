import { Conection } from "../database/Conection";
import { IUserGet } from "../interfaces/user/IUserGet";
import { UserModel } from "../models/UserModel";
import { ServiceError } from "../utils/errors/service.error";
import { FollowerModel } from "../models/FollowerModel";

export class FollowService {

    constructor(
        private readonly conection: Conection
    ) { }

    getMyFollowers = (user_id: string): Promise<IUserGet[]> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const followerModel = new FollowerModel(client);
            try {
                const _followers = await followerModel.getAllByUser(user_id);
                res(_followers)
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    add = (user_id: string, follow_user_id: string): Promise<void> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const followerModel = new FollowerModel(client);
            const userModel = new UserModel(client);
            try {
                const _user = await userModel.getById(follow_user_id);
                if(!_user) throw new ServiceError("El usuario no existe");

                const _rowCount = await followerModel.add(user_id, follow_user_id);

                if(_rowCount == 0)
                    throw new ServiceError("No se pudo seguir el usuario");

                await this.conection.commit(client);
                res();
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    remove = (user_id: string, follow_user_id: string): Promise<void> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const followerModel = new FollowerModel(client);
            const userModel = new UserModel(client);
            try {
                const _user = await userModel.getById(follow_user_id);
                if(!_user) throw new ServiceError("El usuario no existe");

                const _rowCount = await followerModel.remove(user_id, follow_user_id);

                if(_rowCount == 0)
                    throw new ServiceError("No se pudo des seguir el usuario");

                await this.conection.commit(client);
                res();
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

}