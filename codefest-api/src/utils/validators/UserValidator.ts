import joi from 'joi';
import { IUserPost } from 'interfaces/user/IUserPost';
import { IUserPut } from 'interfaces/user/IUserPut';

export const UserPostValidator = joi.object<IUserPost>({
    name:
        joi.string()
            .required()
            .messages({
                "any.required": "El nombre es requerido."
            }),
    email:
        joi.string()
            .required()
            .messages({
                "any.required": "El email es requerido."
            }),
    cel:
        joi.string()
            .pattern(new RegExp(/^[0-9]+$/))
            .required()
            .messages({
                "string.pattern.base": "Numero de telefono no valido.",
                "any.required": "El numero de celular es requerido."
            }),
    password:
        joi.string()
            .required()
            .messages({
                "any.required": "La contraseña es requerida."
            }),
});

export const UserPutValidator = joi.object<IUserPut>({
    name:
        joi.string()
            .messages({
                "any.required": "El nombre es requerido."
            }),
    email:
        joi.string()
            .messages({
                "any.required": "El email es requerido."
            }),
    cel:
        joi.string()
            .pattern(new RegExp(/^[0-9]+$/))
            .messages({
                "string.pattern.base": "Numero de telefono no valido.",
                "any.required": "El numero de celular es requerido."
            }),
    password:
        joi.string()
            .messages({
                "any.required": "La contraseña es requerida."
            }),
});