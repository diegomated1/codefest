import { Authorize, AuthorizeAll, Controller, FromBody, FromParam, Get, Post } from "../router/router";
import { Response, Request, NextFunction } from "express";
import { EventService } from "../services/EventService";
import { EventPostValidator } from "../utils/validators/EventValidator";


@Controller()
export class EventController {

  constructor(
    private readonly eventService: EventService
  ) {
  }


  @Get("/event/{event_id}", "find event by id")
  @FromParam("event_id")
  async findEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const { event_id } = req.params;
      const _event = await this.eventService.findOneEventById(event_id);
      res.Ok(_event);
    } catch (error) {
      next(error);
    }
  };

  @Get("/event/location", "find event by location")
  @FromBody("location")
  async findEventByLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { location } = req.body;
      const _user = await this.eventService.findAllEventLocation(location);
      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

  @Get("/event/likes", "find order by likes")
  async orderEventByLikes(req: Request, res: Response, next: NextFunction) {
    try {
      const _user = await this.eventService.OrderByLike();
      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

  @Get("/event/suscribed", "find order by likes")
  async orderEventBySuscribed(req: Request, res: Response, next: NextFunction) {
    try {
      const _user = await this.eventService.OrderBySuscribed();
      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

  @Get("/event/places", "find event by places")
  @FromBody("places")
  async findEventByPlaces(req: Request, res: Response, next: NextFunction) {
    try {
      const { places } = req.body;
      const _user = await this.eventService.findAllEventPlaces(places);
      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

  @Post("/event/create", "create event")
  @Authorize()
  @FromBody("event", EventPostValidator)
  async insertEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { event } = req.body;
      const _user = await this.eventService.insertEvent(event);
      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };

  @Get("/events", "find all events ")
  async findAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const _user = await this.eventService.findAll();
      res.Ok(_user);
    } catch (error) {
      next(error);
    }
  };
}
