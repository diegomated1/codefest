import { ServiceError } from "../utils/errors/service.error";
import { HttpStatusCode } from "../router/RouterTypes";
import { Conection } from "../database/Conection";
import { IGroup } from "../interfaces/group/IGroup";
import { GroupModel } from "../models/GroupModel";
import { IGroupPost } from "../interfaces/group/IGroupPost";
import { v4 as uuid } from 'uuid';
import { UserModel } from "../models/UserModel";
import format from "pg-format";
import { IGroupGet } from "interfaces/group/IGruoupGet";

export class GroupService {

    constructor(
        private readonly conection: Conection
    ) { }

    getById = (id: string): Promise<IGroup | null> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const groupModel = new GroupModel(client);
            try {
                const _group = await groupModel.getById(id);
                res(_group)
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    getByUserId = (id: string): Promise<IGroupGet[]> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const groupModel = new GroupModel(client);
            try {
                const _group = await groupModel.getByUserId(id);
                res(_group)
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }
    insert = (entity: IGroupPost, users: string[], creator_id: string): Promise<IGroup> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const groupModel = new GroupModel(client);
            const userModel = new UserModel(client);
            try {

                for(let i=0;i<users.length;i++){
                    const _user = await userModel.getById(users[i]);
                    if (!_user) throw new ServiceError("Uno de los usuarios especificados no existe.", HttpStatusCode.BAD_REQUEST);
                }

                const id = uuid();
                const group: IGroup = {
                    ...entity,
                    id,
                    created_date: new Date(),
                    rate: 0,
                    rate_acu: 0,
                    rate_cont: 0
                }
                const _group = await groupModel.insert(group);
                if (!_group) throw new ServiceError("Error al crear el grupo.", HttpStatusCode.BAD_REQUEST);

                const participants: [string, number, string][] = users.map(user_id => ([
                    user_id, 1, _group.id
                ]));
                participants.push([creator_id, 2, _group.id]);
                console.log(participants)
                const participantsCount = await groupModel.addParticipants(participants);
                if (participantsCount != (users.length + 1)) throw new ServiceError("Error al crear el grupo.", HttpStatusCode.BAD_REQUEST);

                await this.conection.commit(client);
                res(_group);
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    addParticipant = (group_id: string, user_id: string): Promise<void> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const groupModel = new GroupModel(client);
            const userModel = new UserModel(client);
            try {
                const _user = await userModel.getById(user_id);
                if (!_user) throw new ServiceError("El usuario no existe.");

                const _userInGroup = await groupModel.getParticipant(group_id, user_id);
                if (_userInGroup) throw new ServiceError("El usuario ya esta agregado.");

                const _participant = await groupModel.addParticipant(group_id, user_id, 1);
                if (!_participant) throw new ServiceError("Error al agregar el usuario.");

                await this.conection.commit(client);
                res();
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    removeParticipant = (group_id: string, user_id: string): Promise<void> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const groupModel = new GroupModel(client);
            const userModel = new UserModel(client);
            try {
                const _group = await groupModel.getById(group_id);
                if (!_group) throw new ServiceError("El grupo no existe.");

                const _user = await userModel.getById(user_id);
                if (!_user) throw new ServiceError("El usuario no existe.");

                const participantCount = await groupModel.removeParticipant(group_id, user_id);
                if (participantCount != 1) throw new ServiceError("Error al eliminar el usuario.");

                await this.conection.commit(client);
                res();
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

}