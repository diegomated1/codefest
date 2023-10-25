import { ServiceError } from '../utils/errors/service.error';
import { PoolClient } from 'pg';
import { IMessage } from '../interfaces/messageUser/IMessage';
import { query_GetMessages } from './queries/Message';
import { IMessageGroup } from '../interfaces/messageGroup/IMessageGroup';

export class MessageModel {
    constructor(
        private readonly client?: PoolClient
    ) {
    }

    getAllUser = (sender_id: string, receiver_id: string): Promise<IMessage[]> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = query_GetMessages;
                const values = [sender_id, receiver_id];
                const result = await this.client.query<IMessage>(query, values);
                const messages = result.rows;
                res(messages || []);
            } catch (error) {
                rej(error);
            }
        });
    };

    getAllGroup = (group_id: string): Promise<IMessageGroup[]> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = "SELECT * FROM message_group WHERE group_id = $1 ORDER BY created_date";
                const values = [group_id];
                const result = await this.client.query<IMessageGroup>(query, values);
                const messages = result.rows;
                res(messages || []);
            } catch (error) {
                rej(error);
            }
        });
    };
    
    insert = (message: IMessage): Promise<IMessage | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const columns = Object.keys(message).join(', ');
                const placeholders = Object.entries(message).map((_, i) => `$${i + 1}`).join(', ');
                const values = Object.values(message);

                const query = `INSERT INTO message_users (${columns}) VALUES (${placeholders}) RETURNING *`;
                console.log(query);
                const result = await this.client.query<IMessage>(query, values);
                const _message = result.rows[0];
                res(_message);
            } catch (error) {
                rej(error);
            }
        });
    };
    
    insertInGroup = (message: IMessageGroup): Promise<IMessageGroup | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const columns = Object.keys(message).join(', ');
                const placeholders = Object.entries(message).map((_, i) => `$${i + 1}`).join(', ');
                const values = Object.values(message);

                const query = `INSERT INTO message_group (${columns}) VALUES (${placeholders}) RETURNING *`;
                console.log(query);
                const result = await this.client.query<IMessageGroup>(query, values);
                const _message = result.rows[0];
                res(_message);
            } catch (error) {
                rej(error);
            }
        });
    };

}