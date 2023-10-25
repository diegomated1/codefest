import { IUserGet } from "../interfaces/user/IUserGet";
import { FriendModel } from "../models/FriendModel";
import { UserModel } from "../models/UserModel";
import { ServiceError } from "../utils/errors/service.error";
import { Conection } from "../database/Conection";

export class FriendService {

    constructor(
        private readonly conection: Conection
    ) { }

    getMyFriends = (user_id: string): Promise<IUserGet[]> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const friendModel = new FriendModel(client);
            try {
                const _followers = await friendModel.getAllByUser(user_id);
                res(_followers)
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    add = (user_id: string, friend_id: string): Promise<void> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const friendModel = new FriendModel(client);
            const userModel = new UserModel(client);
            try {
                const _user = await userModel.getById(friend_id);
                if(!_user) throw new ServiceError("El usuario no existe");

                const _rowCount = await friendModel.add(user_id, friend_id);

                if(_rowCount == 0)
                    throw new ServiceError("No se pudo agregar a amigos el usuario");

                await this.conection.commit(client);
                res();
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    remove = (user_id: string, friend_id: string): Promise<void> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const friendModel = new FriendModel(client);
            const userModel = new UserModel(client);
            try {
                const _user = await userModel.getById(friend_id);
                if(!_user) throw new ServiceError("El usuario no existe");

                const _rowCount = await friendModel.remove(user_id, friend_id);

                if(_rowCount == 0)
                    throw new ServiceError("No se pudo eliminar de amigos el usuario");

                await this.conection.commit(client);
                res();
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }
}