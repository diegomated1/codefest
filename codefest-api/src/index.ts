import dotenv from 'dotenv';
dotenv.config();

import { Database } from './database/database';
import router from './router/router';
import App from './app';
import { AuthMiddleware } from './middlewares/AuthMiddleware';
import { Conection } from './database/Conection';

import { types } from 'pg'
import { EventService } from './services/EventService';
import { EventController } from './controllers/EventController';
types.setTypeParser(1700, function (val) {
    return parseFloat(val);
});

function main(): App {

    // Database
    const conectionString = process.env.POSTGRES_CONECTIONSTRING!;
    console.log(conectionString);
    const database = new Database(conectionString);

    const conection = new Conection(database);

    // Services

    const eventService = new EventService(conection);

    // Controllers

    new EventController(eventService);

    router.addAuthMiddleware(AuthMiddleware);

    router.addService(eventService);

    const app = new App(router.Router(), database);
    app.start();

    return app;
}

export default main()