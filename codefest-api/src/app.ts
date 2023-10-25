import express, { Application, Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Responses } from './middlewares/ResponseMiddleware';
import http from 'http';
import { Database } from './database/database';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';

export default class App {
    readonly app: Application
    #ENVIRONMENT: string

    #http_server?: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

    #http_port: number
    #host: string | undefined

    constructor(
        private readonly Router: Router,
        private readonly database: Database
    ) {
        this.#ENVIRONMENT = process.env.ENVIRONMENT ?? 'development';
        
        if(this.#ENVIRONMENT == "test"){
            this.#http_port = 0;
        }else{
            this.#http_port = parseInt(process.env.API_HTTP_PORT ?? '3000');
        }
        this.#host = process.env.API_HOST;

        this.app = express()
        this.#config()
        this.#routes()
    }

    #config = (): void => {
        this.app.use(cors({
            origin: process.env.CLIENT_HOST! || true,
        }));
        this.app.use(express.json());
        this.app.use(Responses)
        if (this.#ENVIRONMENT === "development") {
            this.app.use(morgan('dev'));
        }
    }

    #routes = (): void => {
        this.app.use(this.Router)
        this.app.use(ErrorMiddleware)
    }

    start = (): void => {
        const httpServer = http.createServer(this.app);

        if (this.#host)
            this.#http_server = httpServer.listen(this.#http_port, this.#host);
        else
            this.#http_server = httpServer.listen(this.#http_port);
    }

    close = (): void => {
        this.#http_server?.close();
        this.database.close();
    }
} 
