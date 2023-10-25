import { AuthorizeAll, Controller, Delete, FromBody, FromParam, Get, Post } from "../router/router";
import { Response, Request, NextFunction } from "express";
import { GroupService } from "../services/GroupService";
import { GroupPostValidator } from "../utils/validators/groupValidator";


@Controller()
@AuthorizeAll()
export class GroupController {

  constructor(
    private readonly groupService: GroupService
  ) {
  }

  @Get("", "Create group")
  async getMyGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;

      const _groups = await this.groupService.getByUserId(user_id);

      res.Ok(_groups)
    } catch (error) {
      next(error);
    }
  };

  @Get("/{group_id}", "Get group by id")
  @FromParam("group_id")
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      const _group = await this.groupService.getById(group_id);

      (_group)
        ? res.Ok(_group)
        : res.NotFound("Grupo no encontrado.");
    } catch (error) {
      next(error);
    }
  };

  @Post("", "add group")
  @FromBody("Group", GroupPostValidator)
  @FromBody("Users")
  async addGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;
      const { Group, Users } = req.body;

      const _user = await this.groupService.insert(Group, Users, user_id);

      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

  @Post("/{group_id}/participants/{user_id}", "add participant to the group")
  @FromParam("group_id")
  @FromParam("user_id")
  async addParticipant(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id, user_id } = req.params;

      const _user = await this.groupService.addParticipant(group_id, user_id);

      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

  @Delete("/{group_id}/participants/{user_id}", "delete participant from the group")
  @FromParam("group_id")
  @FromParam("user_id")
  async removeParticipant(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id, user_id } = req.params;

      const _user = await this.groupService.removeParticipant(group_id, user_id);

      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

}
