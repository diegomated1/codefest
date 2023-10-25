import { AuthorizeAll, Controller, FromBody, FromParam, Get, Post } from "../router/router";
import { Response, Request, NextFunction } from "express";
import { ChatService } from "../services/ChatService";
import { MessageGroupValidator, MessageUserValidator } from "../utils/validators/messageValidator";


@Controller()
@AuthorizeAll()
export class ChatController {

  constructor(
    private readonly chatService: ChatService
  ) {
  }

  @Post("/user", "Send message to another user")
  @FromBody("Message", MessageUserValidator)
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;
      const { Message } = req.body;

      const _message = await this.chatService.insertInUser(user_id, Message);

      res.Ok(_message)
    } catch (error) {
      next(error);
    }
  };

  @Post("/group", "Send message to group")
  @FromBody("Message", MessageGroupValidator)
  async sendMessageGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;
      const { Message } = req.body;

      const _message = await this.chatService.insertInGroup(user_id, Message);

      res.Ok(_message)
    } catch (error) {
      next(error);
    }
  };

  @Get("/user/{receiver_id}", "Get messages from chat")
  @FromParam("receiver_id")
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = res.locals;
      const { receiver_id } = req.params;

      const _messages = await this.chatService.getFromUser(user_id, receiver_id);

      res.Ok(_messages);
    } catch (error) {
      next(error);
    }
  };

  @Get("/group/{group_id}", "Get messages from group")
  @FromParam("group_id")
  async getMessagesGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      const _messages = await this.chatService.getFromGroup(group_id);

      res.Ok(_messages);
    } catch (error) {
      next(error);
    }
  };

}
