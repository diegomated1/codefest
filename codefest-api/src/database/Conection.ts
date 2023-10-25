import { Database } from "./database";
import { PoolClient } from "pg";

export class Conection {

    constructor(
        private readonly database: Database
    ) { }

    connect = async () =>{
        const client = await this.database.connect();
        await client.query("BEGIN");
        return client
    }

    commit = (client?: PoolClient): Promise<void> => {
        return new Promise(async (res, rej) => {
            if(!client) return rej(new Error());
            try {
                await client.query("COMMIT");
                res();
            } catch (err) {
                await client.query("ROLLBACK");
                rej(err);
            } finally {
                if(client) client.release();
                res();
            }
        });
    }

    rollback = (client?: PoolClient): Promise<void> => {
        return new Promise(async (res, rej) => {
            if(!client) throw Error();
            try {
                await client.query("ROLLBACK");
                res();
            } catch (err) {
                rej(err);
            } finally {
                if(client) client.release();
                res();
            }
        });
    }

}
