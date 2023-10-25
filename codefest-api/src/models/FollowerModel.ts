import { ServiceError } from '../utils/errors/service.error';
import { PoolClient } from 'pg';
import { IUserGet } from 'interfaces/user/IUserGet';
import { QUERY_getMyFollowers } from './queries/Follower';

export class FollowerModel {
    constructor(
        private readonly client?: PoolClient
    ) {
    }

    getAllByUser = (user_id: string): Promise<IUserGet[]> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = QUERY_getMyFollowers;
                const values = [user_id];
                const result = await this.client.query<IUserGet>(query, values);
                const _res = result.rows;
                res(_res);
            } catch (error) {
                rej(error);
            }
        });
    };

    add = (user_id: string, follow_user_id: string): Promise<number> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = "INSERT INTO follower (user_id, follower_id) VALUES ($1, $2)";
                const values = [user_id, follow_user_id];
                const result = await this.client.query(query, values);
                const _res = result.rowCount;
                res(_res);
            } catch (error) {
                rej(error);
            }
        });
    };

    remove = (user_id: string, follow_user_id: string): Promise<number> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = "DELETE FROM follower WHERE user_id = $1 AND follower_id = $2";
                const values = [user_id, follow_user_id];
                const result = await this.client.query(query, values);
                const _res = result.rowCount;
                res(_res);
            } catch (error) {
                rej(error);
            }
        });
    };

}