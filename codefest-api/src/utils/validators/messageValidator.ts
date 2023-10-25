import { IGroupPost } from "interfaces/group/IGroupPost";
import { IMessageGroupPost } from "interfaces/messageGroup/IMessageGroupPost";
import { IMessagePost } from "interfaces/messageUser/IMessagePost";
import joi from "joi";

export const MessageUserValidator = joi.object<IMessagePost>({
    receiver_id:
        joi.string()
            .messages({
                "any.required": "El receiver es requerido."
            }),
    content:
        joi.string()
            .messages({
                "any.required": "El contenido del mensaje es requerido."
            }),
});


export const MessageGroupValidator = joi.object<IMessageGroupPost>({
    group_id:
        joi.string()
            .messages({
                "any.required": "El grupo es requerido."
            }),
    content:
        joi.string()
            .messages({
                "any.required": "El contenido del mensaje es requerido."
            }),
});