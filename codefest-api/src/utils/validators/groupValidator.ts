import { IGroupPost } from "interfaces/group/IGroupPost";
import joi from "joi";

export const GroupPostValidator = joi.object<IGroupPost>({
    name:
        joi.string()
            .messages({
                "any.required": "El nombre es requerido."
            }),
    description:
        joi.string()
            .messages({
                "any.required": "La descripcion es requerida."
            })
});