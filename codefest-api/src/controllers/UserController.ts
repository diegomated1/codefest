import { Response, Request, NextFunction } from "express";
import { validate } from "uuid";

import { UserPutValidator } from "../utils/validators/UserValidator";
import { UserService } from "../services/UserService";
import { Authorize, Controller, FromBody, FromParam, Get, Post, Put } from "../router/router";

@Controller()
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {
  }

  @Get("", "Get all users")
  @Authorize()
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const all_users = await this.userService.getAll();
      res.Ok(all_users);
    } catch (error) {
      next(error);
    }
  };
  
  @Get("/token", "Get user by Token")
  @Authorize()
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

  @Get("/{user_id}", "Get user by ID")
  @Authorize()
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
  @Authorize()
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

} 