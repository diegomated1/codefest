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
import { GroupService } from './services/GroupService';
import { GroupController } from './controllers/GroupController';
import { ChatService } from './services/ChatService';
import { ChatController } from './controllers/ChatController';
import { FriendService } from './services/FriendService';
import { FollowService } from './services/FollowService';

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
    const groupService = new GroupService(conection);
    const chatService = new ChatService(conection);
    const friendService = new FriendService(conection);
    const followService = new FollowService(conection);

    // Controllers
    new UserController(userService, followService, friendService);
    new GroupController(groupService);
    new AuthController(authService, userService);
    new ChatController(chatService);

    router.addAuthMiddleware(AuthMiddleware);
    router.addService(userService);
    router.addService(authService);
    router.addService(groupService);
    router.addService(chatService);
    router.addService(friendService);
    router.addService(followService);
    
    const app = new App(router.Router(), database);
    app.start();
    
    return app;
}

export default main()