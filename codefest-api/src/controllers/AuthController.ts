import { Authorize, Controller, FromBody, FromParam, Post } from "../router/router";
import { AuthService } from "../services/AuthService";
import { Response, Request, NextFunction } from "express";
import { UserPostValidator } from "../utils/validators/UserValidator";
import { UserService } from "../services/UserService";


@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
  }


  @Post("/sesion", "Log in")
  @FromBody("email")
  @FromBody("password")
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const _token = await this.authService.login(email, password);

      res.Ok(_token);
    } catch (error) {
      next(error);
    }
  };

  @Post("/register", "Register")
  @FromBody("User", UserPostValidator)
  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      const { User } = req.body;

      const _user = await this.userService.insert(User);

      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

}
