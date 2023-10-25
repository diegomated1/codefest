import { Response, Request, NextFunction } from "express";
import { validate } from "uuid";

import { UserPutValidator } from "../utils/validators/UserValidator";
import { UserService } from "../services/UserService";
import { AuthorizeAll, Controller, Delete, FromBody, FromParam, Get, Post, Put } from "../router/router";
import { FollowService } from "../services/FollowService";
import { FriendService } from "../services/FriendService";

@Controller()
@AuthorizeAll()
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly followService: FollowService,
    private readonly friendService: FriendService
  ) {
  }

  @Get("", "Get all users")
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const all_users = await this.userService.getAll();
      res.Ok(all_users);
    } catch (error) {
      next(error);
    }
  };
  
  @Get("/token", "Get user by Token")
  async getUserByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;
      if (!validate(user_id)) return res.Failed("Id de usuario no valido.");

      const user = await this.userService.getById(user_id);

      (user)
        ? res.Ok(user)
        : res.NotFound("Usuario no encontrado.");
    } catch (error) {
      next(error);
    }
  };

  @Get("/my-followers", "Get my followers")
  async myFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;

      const _followers = await this.followService.getMyFollowers(user_id);

      res.Ok(_followers)
    } catch (error) {
      next(error);
    }
  };

  @Get("/my-friends", "Get my friends")
  async myFriends(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;

      const _friends = await this.friendService.getMyFriends(user_id);

      res.Ok(_friends)
    } catch (error) {
      next(error);
    }
  };

  @Get("/{user_id}", "Get user by ID")
  @FromParam("user_id")
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;
      if (!validate(user_id)) return res.Failed("Id de usuario no valido.");

      const user = await this.userService.getById(user_id);

      (user)
        ? res.Ok(user)
        : res.NotFound("Usuario no encontrado.");
    } catch (error) {
      next(error);
    }
  };

  @Put("", "Update a user's data")
  @FromBody("User", UserPutValidator)
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;
      const { User } = req.body;
      
      const _user = await this.userService.update(user_id, User);

      (_user)
        ? res.Ok(_user)
        : res.Failed();
    } catch (error) {
      next(error);
    }
  };

  @Post("/{user_id}/follow", "Follow user")
  @FromParam("user_id")
  async follow(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id: current_user_id } = res.locals;
      const { user_id } = req.params;

      const _message = await this.followService.add(current_user_id, user_id);

      res.Ok(_message)
    } catch (error) {
      next(error);
    }
  };

  @Delete("/{user_id}/unfollow", "Unfollow user")
  @FromParam("user_id")
  async unfollow(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id: current_user_id } = res.locals;
      const { user_id } = req.params;

      const _message = await this.followService.remove(current_user_id, user_id);

      res.Ok(_message)
    } catch (error) {
      next(error);
    }
  };

  @Post("/{user_id}/friend", "Add friend")
  @FromParam("user_id")
  async addFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id: current_user_id } = res.locals;
      const { user_id } = req.params;

      const _message = await this.friendService.add(current_user_id, user_id);

      res.Ok(_message)
    } catch (error) {
      next(error);
    }
  };

  @Delete("/{user_id}/unfriend", "Remove friend")
  @FromParam("user_id")
  async removeFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id: current_user_id } = res.locals;
      const { user_id } = req.params;

      const _message = await this.friendService.remove(current_user_id, user_id);

      res.Ok(_message)
    } catch (error) {
      next(error);
    }
  };

} 