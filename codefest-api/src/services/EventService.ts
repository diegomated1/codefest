import jwt from "jsonwebtoken";
import bc from "bcrypt";
import { ServiceError } from "../utils/errors/service.error";
import { HttpStatusCode } from "../router/RouterTypes";
import { Conection } from "../database/Conection";
import { EventModel } from "../models/EventModel";
import { IEvent } from "../interfaces/IEvent";
import { v4 as uuid } from 'uuid';

export class EventService {

    constructor(
        private readonly conection: Conection
    ) { }

    findOneEventById = (id:string):Promise<IEvent | null> =>{
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const eventModel = new EventModel(client);
            try {
                const _event = await eventModel.getById(id);

                if (_event) {
                    this.conection.commit(client)
                    res(_event);
                } else {
                    throw new ServiceError("Evento no encontrado.", HttpStatusCode.NOT_FOUND);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        })
    }

    findAllEventLocation = (location:string):Promise<IEvent[] | null> =>{
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const eventModel = new EventModel(client);
            try {
                const _event = await eventModel.getAllByLocation(location);

                if (_event) {
                    this.conection.commit(client)
                    res(_event);
                } else {
                    throw new ServiceError("No hay eventos encontrados.", HttpStatusCode.NOT_FOUND);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        })
    }

    OrderByLike = ():Promise<IEvent[] | null> =>{
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const eventModel = new EventModel(client);
            try {
                const _event = await eventModel.getAllByLikes();

                if (_event) {
                    this.conection.commit(client)
                    res(_event);
                } else {
                    throw new ServiceError("No hay eventos encontrados.", HttpStatusCode.NOT_FOUND);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        })
    }

    OrderBySuscribed = ():Promise<IEvent[] | null> =>{
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const eventModel = new EventModel(client);
            try {
                const _event = await eventModel.getAllBySuscribed();
                if (_event) {
                    this.conection.commit(client)
                    res(_event);
                } else {
                    throw new ServiceError("No hay eventos encontrados.", HttpStatusCode.NOT_FOUND);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        })
    }

    findAllEventPlaces = (places:number):Promise<IEvent[] | null> =>{
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const eventModel = new EventModel(client);
            try {
                const _event = await eventModel.getAllByPlaces(places);
                if (_event) {
                    this.conection.commit(client)
                    res(_event);
                } else {
                    throw new ServiceError("No hay eventos con esas plazas.", HttpStatusCode.NOT_FOUND);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        })
    }

    insertEvent = (event:IEvent):Promise<IEvent | null>=>{
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const eventModel = new EventModel(client);
            try {
                event.id = uuid();
                const _event = await eventModel.insertEvent(event);
                if (_event) {
                    this.conection.commit(client)
                    res(_event);
                } else {
                    throw new ServiceError("No se pudo crear el evento.", HttpStatusCode.BAD_REQUEST);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        })
    }

    findAll = ():Promise<IEvent[] | null> =>{
        return new Promise(async (res, rej) => {
            const client = await this.conection.connect();
            const eventModel = new EventModel(client);
            try {
                const _event = await eventModel.getAll();
                if (_event) {
                    this.conection.commit(client)
                    res(_event);
                } else {
                    throw new ServiceError("No hay eventos.", HttpStatusCode.NOT_FOUND);
                }
            } catch (error) {
                await this.conection.rollback(client);
                rej(error)
            }
        })
    } 
}