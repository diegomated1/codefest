import dotenv from 'dotenv';
dotenv.config();

import { Database } from './database/database';
import router from './router/router';
import App from './app';
import { AuthMiddleware } from './middlewares/AuthMiddleware';
import { Conection } from './database/Conection';
import { types } from 'pg'
import { AuthController } from './controllers/AuthController';
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';
import { UserController } from './controllers/UserController';
types.setTypeParser(1700, function (val) {
    return parseFloat(val);
});

function main(): App {

    // Database
    const conectionString = process.env.POSTGRES_CONECTIONSTRING!;
    
    const database = new Database(conectionString);

    const conection = new Conection(database);

    // Services
    const userService = new UserService(conection);
    const authService = new AuthService(conection);

    // Controllers
    new UserController(userService);
    new AuthController(authService, userService);

    router.addAuthMiddleware(AuthMiddleware);
    router.addService(userService);
    router.addService(authService);

    const app = new App(router.Router(), database);
    app.start();
    
    return app;
}

export default main()