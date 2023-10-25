import { Authorize, Controller, FromBody, FromParam, Post } from "../router/router";
import { Response, Request, NextFunction } from "express";
import { EventService } from "../services/EventService";
import { IEventPost } from "../interfaces/event/IEventPosts";


@Controller()
export class EventController {

  constructor(
    private readonly eventService: EventService,
  ) {
  }

  @Post("/event", "create event")
  @FromBody("title")
  @FromBody("description")
  @FromBody("location")
  @FromBody("creator_id")
  @FromBody("created_date")
  @FromBody("start_date")
  @FromBody("end_date")
  @FromBody("groups_id")
  @FromBody("urlEvent")
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, description, location, creator_id, created_date, start_date, end_date, groups_id, urlEvent } = req.body;

        const eventPost: IEventPost = {
            title:title, 
            description: description,
            location: location,
            creator_id: creator_id,
            created_date: new Date(created_date),
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            groups_id: groups_id,
            urlEvent: urlEvent
          };

      const _event = await this.eventService.createEvent(eventPost);

      res.Ok(_event);
    } catch (error) {
      next(error);
    }
  };
}