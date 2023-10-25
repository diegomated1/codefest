import { Pool, PoolClient } from "pg";

export class Database {

    //client: Client
    pool: Pool

    constructor(
        private readonly connectionString: string
    ) {
        this.pool = new Pool({
            connectionString: this.connectionString,
            max: 30
        })
    }

    connect = async (): Promise<PoolClient> => {
        const client = await this.pool.connect();
        return client;
    }

    close = async () => {
        await this.pool.end();
    }
} 
