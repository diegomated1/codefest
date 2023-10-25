import { IGroup } from 'interfaces/group/IGroup';
import { IUser } from '../interfaces/user/IUser';
import { ServiceError } from '../utils/errors/service.error';
import { PoolClient } from 'pg';
import format from 'pg-format';
import { QUERY_groupById, QUERY_groupByUserId } from './queries/Group';
import { IUserGroup } from '../interfaces/group/IUserGroup';
import { IGroupGet } from '../interfaces/group/IGruoupGet';
import { IGroupPut } from '../interfaces/group/IGroupPut';

export class GroupModel {
    constructor(
        private readonly client?: PoolClient
    ) {
    }

    getById = (id: string): Promise<IGroup | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = QUERY_groupById;
                const values = [id];
                const result = await this.client.query<IGroup>(query, values);
                const group = result.rows[0];
                res(group);
            } catch (error) {
                rej(error);
            }
        });
    };

    getByUserId = (user_id: string): Promise<IGroupGet[]> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = QUERY_groupByUserId;
                const values = [user_id];
                const result = await this.client.query<IGroupGet>(query, values);
                const groups = result.rows;
                res(groups);
            } catch (error) {
                rej(error);
            }
        });
    };

    getAll = (): Promise<IUser[]> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = 'SELECT * FROM users';
                const result = await this.client.query<IUser>(query);
                const user = result.rows;
                res(user || []);
            } catch (error) {
                rej(error);
            }
        });
    };

    insert = (group: IGroup): Promise<IGroup | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const columns = Object.keys(group).join(', ');
                const placeholders = Object.entries(group).map((_, i) => `$${i + 1}`).join(', ');
                const values = Object.values(group);

                const query = `INSERT INTO groups (${columns}) VALUES (${placeholders}) RETURNING *`;

                const result = await this.client.query<IGroup>(query, values);
                const _group = result.rows[0];
                res(_group);
            } catch (error) {
                rej(error);
            }
        });
    };

    addParticipant = (group_id: string, user_id: string, rol_id: number): Promise<number> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const values = [user_id, group_id, rol_id];

                const query = `INSERT INTO user_groups (user_id, groups_id, rol) VALUES ($1, $2, $3)`;

                const result = await this.client.query<IGroup>(query, values);
                const rowCount = result.rowCount;
                res(rowCount);
            } catch (error) {
                rej(error);
            }
        });
    };

    removeParticipant = (group_id: string, user_id: string): Promise<number> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const values = [group_id, user_id];

                const query = `DELETE FROM user_groups WHERE groups_id = $1 AND user_id = $2`;

                const result = await this.client.query<IGroup>(query, values);
                const rowCount = result.rowCount;
                res(rowCount);
            } catch (error) {
                rej(error);
            }
        });
    };

    addParticipants = (users: [string, number, string][]): Promise<number> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {

                const query = format(`INSERT INTO user_groups (user_id, rol, groups_id) VALUES %L`, users);

                const result = await this.client.query<IGroup>(query);
                const rowCount = result.rowCount;
                res(rowCount);
            } catch (error) {
                rej(error);
            }
        });
    };

    getParticipant = (group_id: string, user_id: string): Promise<IUserGroup> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const values = [user_id, group_id];

                const query = `SELECT * FROM user_groups WHERE user_id = $1 AND groups_id = $2`;

                const results = await this.client.query<IUserGroup>(query, values);
                const result = results.rows[0];
                res(result);
            } catch (error) {
                rej(error);
            }
        });
    };

    update = (group_id: string, entity: Partial<IGroupPut>): Promise<IGroup | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const updateClauses = Object.entries(entity)
                    .map(([key, value], i) => `"${key}" = $${i + 1}`)
                    .join(', ');

                const query = `UPDATE users SET ${updateClauses} WHERE id = $${Object.keys(entity).length + 1} RETURNING *`;
                
                const values = [...Object.values(entity), group_id];
                
                const result = await this.client.query<IGroup>(query, values);
                const _group = result.rows[0];

                res(_group);
            } catch (error) {
                rej(error);
            }
        });
    };

}