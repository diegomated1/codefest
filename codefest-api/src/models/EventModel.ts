import { IEvent } from 'interfaces/IEvent';
import { ServiceError } from '../utils/errors/service.error';
import { PoolClient } from 'pg';

export class EventModel {
    constructor(
        private readonly client?: PoolClient
    ) {
    }

    getById = (id: string): Promise<IEvent | null> => {
        return new Promise(async (res, rej) => {
            if (!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = `SELECT * FROM event where id = $1`;
                const values = [id];
                const result = await this.client.query<IEvent>(query, values);
                const event = result.rows[0];
                res(event);
            } catch (error) {
                rej(error);
            }
        });
    };

    getAllByLocation = (location: string): Promise<IEvent[] | null> => {
        return new Promise(async (res, rej) => {
            if (!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = 'SELECT * FROM event WHERE location = $1';
                const values = [location];
                const result = await this.client.query<IEvent>(query, values);
                const event = result.rows;
                res(event);
            } catch (error) {
                rej(error);
            }
        });
    };

    getAllByLikes = (): Promise<IEvent[] | null> => {
        return new Promise(async (res, rej) => {
            if (!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = 'SELECT * FROM event ORDER BY likes DESC LIMIT 20';
                const result = await this.client.query<IEvent>(query);
                const event = result.rows;
                res(event);
            } catch (error) {
                rej(error);
            }
        });
    };

    getAllBySuscribed = (): Promise<IEvent[] | null> => {
        return new Promise(async (res, rej) => {
            if (!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = 'SELECT * FROM event ORDER BY subscribed DESC LIMIT 20';
                const result = await this.client.query<IEvent>(query);
                const event = result.rows;
                res(event);
            } catch (error) {
                rej(error);
            }
        });
    };

    getAllByPlaces = (places: number): Promise<IEvent[] | null> => {
        return new Promise(async (res, rej) => {
            if (!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = 'SELECT * FROM event WHERE availability >= $1';
                const values = [places];
                const result = await this.client.query<IEvent>(query, values);
                const event = result.rows;
                res(event);
            } catch (error) {
                rej(error);
            }
        });
    };

    insertEvent = (event: IEvent): Promise<IEvent | null> => {
        return new Promise(async (res, rej) => {
            if (!this.client) throw new ServiceError("Error de conexion");
            try {
                const columns = Object.keys(event).join(', ');
                const placeholders = Object.entries(event).map((_, i) => `$${i + 1}`).join(', ');
                const values = Object.values(event);

                const query = `INSERT INTO event (${columns}) VALUES (${placeholders}) RETURNING *`;
                console.log(query);
                const result = await this.client.query<IEvent>(query, values);
                const _event = result.rows[0];
                res(_event);
            } catch (error) {
                rej(error);
            }
        });
    };

    getAll = (): Promise<IEvent[]> => {
        return new Promise(async (res, rej) => {
            if (!this.client) throw new ServiceError("Error de conexion");
            try {
                const query = 'SELECT * FROM event';
                const result = await this.client.query<IEvent>(query);
                const event = result.rows;
                res(event ?? []);
            } catch (error) {
                rej(error);
            }
        });
    };

    // insert = (user: IUser): Promise<IUser | null> => {
    //     return new Promise(async (res, rej) => {
    //         if(!this.client) throw new ServiceError("Error de conexion");
    //         try {
    //             const columns = Object.keys(user).join(', ');
    //             const placeholders = Object.entries(user).map((_, i) => `$${i + 1}`).join(', ');
    //             const values = Object.values(user);

    //             const query = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING *`;
    //             console.log(query);
    //             const result = await this.client.query<IUser>(query, values);
    //             const _user = result.rows[0];
    //             res(_user);
    //         } catch (error) {
    //             rej(error);
    //         }
    //     });
    // };

    // update = (userId: string, entity: Partial<IUser>): Promise<IUser | null> => {
    //     return new Promise(async (res, rej) => {
    //         if(!this.client) throw new ServiceError("Error de conexion");
    //         try {
    //             const updateClauses = Object.entries(entity)
    //                 .map(([key, value], i) => `"${key}" = $${i + 1}`)
    //                 .join(', ');

    //             const query = `UPDATE users SET ${updateClauses} WHERE user.id = $${Object.keys(entity).length + 1} RETURNING *`;

    //             const values = [...Object.values(entity), userId];

    //             const result = await this.client.query<IUser>(query, values);
    //             const _user = result.rows[0];

    //             res(_user);
    //         } catch (error) {
    //             rej(error);
    //         }
    //     });
    // };

}