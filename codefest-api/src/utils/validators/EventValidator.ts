import { IEvent } from 'interfaces/IEvent';
import joi from 'joi';

export const EventPostValidator = joi.object<IEvent>({
    user_id: joi.string().required(),
    title: joi.string().max(255).required(),
    description: joi.string().max(1000),
    location: joi.string().required(),
    date: joi.date().iso().required(),
    availability: joi.number().integer().min(0).required(),
    likes: joi.number().integer().min(0).required(),
    subscribed: joi.number().integer().min(0).required(),
}).messages({
    "string.base": "El campo {#label} debe ser de tipo texto.",
    "string.empty": "El campo {#label} no puede estar vacío.",
    "string.max": "El campo {#label} no puede tener más de {#limit} caracteres.",
    "date.base": "El campo {#label} debe ser una fecha válida.",
    "date.format": "El campo {#label} debe estar en formato ISO.",
    "number.base": "El campo {#label} debe ser un número.",
    "number.integer": "El campo {#label} debe ser un número entero.",
    "number.min": "El campo {#label} no puede ser menor que {#limit}.",
    "any.required": "El campo {#label} es requerido."
});