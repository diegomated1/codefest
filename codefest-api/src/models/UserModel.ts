import { IUser } from '../interfaces/user/IUser';
import { ServiceError } from '../utils/errors/service.error';
import { PoolClient } from 'pg';

export class UserModel {
    constructor(
        private readonly client?: PoolClient
    ) {
    }

    getById = (id: string): Promise<IUser | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = `SELECT * FROM users WHERE id = $1`;
                const values = [id];
                const result = await this.client.query<IUser>(query, values);
                const user = result.rows[0];
                res(user);
            } catch (error) {
                rej(error);
            }
        });
    };

    getByEmail = (email: string): Promise<IUser | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                console.log(email)
                const query = 'SELECT * FROM users WHERE email = $1';
                const values = [email];
                const result = await this.client.query<IUser>(query, values);
                const user = result.rows[0];
                res(user);
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

    insert = (user: IUser): Promise<IUser | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const columns = Object.keys(user).join(', ');
                const placeholders = Object.entries(user).map((_, i) => `$${i + 1}`).join(', ');
                const values = Object.values(user);

                const query = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING *`;
                console.log(query);
                const result = await this.client.query<IUser>(query, values);
                const _user = result.rows[0];
                res(_user);
            } catch (error) {
                rej(error);
            }
        });
    };

    update = (userId: string, entity: Partial<IUser>): Promise<IUser | null> => {
        return new Promise(async (res, rej) => {
            if(!this.client) throw new ServiceError("Error de conexion");
            try {
                const updateClauses = Object.entries(entity)
                    .map(([key, value], i) => `"${key}" = $${i + 1}`)
                    .join(', ');

                const query = `UPDATE users SET ${updateClauses} WHERE id = $${Object.keys(entity).length + 1} RETURNING *`;
                
                const values = [...Object.values(entity), userId];
                
                const result = await this.client.query<IUser>(query, values);
                const _user = result.rows[0];

                res(_user);
            } catch (error) {
                rej(error);
            }
        });
    };

}