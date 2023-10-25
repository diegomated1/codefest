import { ServiceError } from "../utils/errors/service.error";
import { HttpStatusCode } from "../router/RouterTypes";
import { Conection } from "../database/Conection";
import { IEventPost } from "../interfaces/event/IEventPosts";
import { EventModel } from "../models/EventModel";
import { IEvent } from "../interfaces/IEvent";

export class EventService {

    constructor(
        private readonly conection: Conection
    ) { }

    createEvent = (event:IEventPost): Promise<IEvent | null> => {
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const eventModel = new EventModel(client);
            try {
                const _event = await eventModel.createEvents(event);

                if (_event) {
                    console.log(_event)
                    res(_event)
                } else {
                    throw new ServiceError("No se pudo crear el evento.", HttpStatusCode.BAD_REQUEST);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        });
    }

}