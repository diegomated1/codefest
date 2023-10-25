import { ServiceError } from '../utils/errors/service.error';
import { PoolClient } from 'pg';
import { IMessage } from '../interfaces/messageUser/IMessage';
import { query_GetMessages } from './queries/Message';
import { IMessageGroup } from '../interfaces/messageGroup/IMessageGroup';
import { IFollower } from 'interfaces/follower/IFollower';
import { IUserGet } from 'interfaces/user/IUserGet';
import { QUERY_getMyFollowers } from './queries/Follower';
import { QUERY_getMyFriends } from './queries/Friends';

export class FriendModel {
    constructor(
        private readonly client?: PoolClient
    ) {
    }

    getAllByUser = (user_id: string): Promise<IUserGet[]> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = QUERY_getMyFriends;
                const values = [user_id];
                const result = await this.client.query<IUserGet>(query, values);
                const _res = result.rows;
                res(_res);
            } catch (error) {
                rej(error);
            }
        });
    };

    add = (user_id: string, friend_id: string): Promise<number> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = "INSERT INTO friend (user_id, friend_id) VALUES ($1, $2)";
                const values = [user_id, friend_id];
                const result = await this.client.query(query, values);
                console.log(result)
                const _res = result.rowCount;
                res(_res);
            } catch (error) {
                rej(error);
            }
        });
    };

    remove = (user_id: string, friend_id: string): Promise<number> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = "DELETE FROM friend WHERE user_id = $1 AND friend_id = $2";
                const values = [user_id, friend_id];
                const result = await this.client.query(query, values);
                const _res = result.rowCount;
                res(_res);
            } catch (error) {
                rej(error);
            }
        });
    };

}