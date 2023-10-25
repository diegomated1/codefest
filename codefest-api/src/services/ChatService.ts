import { ServiceError } from "../utils/errors/service.error";
import { HttpStatusCode } from "../router/RouterTypes";
import { Conection } from "../database/Conection";
import { GroupModel } from "../models/GroupModel";
import { v4 as uuid } from 'uuid';
import { UserModel } from "../models/UserModel";
import { IMessagePost } from "../interfaces/messageUser/IMessagePost";
import { IMessageGroupPost } from "../interfaces/messageGroup/IMessageGroupPost";
import { MessageModel } from "../models/MessageModel";
import { IMessage } from "../interfaces/messageUser/IMessage";
import { IMessageGroup } from "../interfaces/messageGroup/IMessageGroup";

export class ChatService {

    constructor(
        private readonly conection: Conection
    ) { }

    insertInUser = (sender_id: string, message: IMessagePost): Promise<IMessage | null> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const userModel = new UserModel(client);
            const messageModel = new MessageModel(client);
            try {
                const receiver = await userModel.getById(message.receiver_id);
                if(!receiver) throw new ServiceError("El receiver no existe");

                const id = uuid();
                const newMessage: IMessage = {
                    ...message,
                    sender_id,
                    created_date: new Date(),
                    id
                }

                const _message = await messageModel.insert(newMessage);
                if(!_message) throw new ServiceError("No se pudo crear el mensaje", HttpStatusCode.INTERNAL_SERVER_ERROR);

                await this.conection.commit(client);
                res(_message)
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    insertInGroup = (sender_id: string, message: IMessageGroupPost): Promise<IMessageGroup | null> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const groupModel = new GroupModel(client);
            const messageModel = new MessageModel(client);
            try {
                const group = await groupModel.getById(message.group_id);
                if(!group) throw new ServiceError("El grupo no existe");

                const id = uuid();
                const newMessage: IMessageGroup = {
                    ...message,
                    sender_id,
                    created_date: new Date(),
                    id
                }

                const _message = await messageModel.insertInGroup(newMessage);
                if(!_message) throw new ServiceError("No se pudo crear el mensaje", HttpStatusCode.INTERNAL_SERVER_ERROR);

                await this.conection.commit(client);
                res(_message)
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    getFromUser = (sender_id: string, receiver_id: string): Promise<IMessage[]> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const messageModel = new MessageModel(client);
            try {

                const messages = await messageModel.getAllUser(sender_id, receiver_id);

                await this.conection.commit(client);
                res(messages);
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

    getFromGroup = (group_id: string): Promise<IMessageGroup[]> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const messageModel = new MessageModel(client);
            try {
                const messages = await messageModel.getAllGroup(group_id);
                await this.conection.commit(client);
                res(messages);
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

}