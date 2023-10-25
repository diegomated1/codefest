import { HttpStatusCode } from "../router/RouterTypes";
import { Request, Response, NextFunction } from "express";

export type GlobalResponse<T> = {
    value: T,
    errors: string[],
    success: boolean
}

export type OkMessageResponse = <T>(
    value?: T,
    httpStatusCode?: HttpStatusCode
) => void

export type NotFoundMessageResponse = <T>(
    errors?: string[] | string
) => void

export type FailedMessageResponse = <T>(
    errors?: string[] | string,
    httpStatusCode?: HttpStatusCode
) => void

export type ErrorMessageResponse = <T>(
    errors?: string[] | string,
    httpStatusCode?: HttpStatusCode
) => void


declare global {
    namespace Express {
        interface Response {
            Ok: OkMessageResponse
            Failed: FailedMessageResponse
            NotFound: NotFoundMessageResponse
            Error: ErrorMessageResponse
        }
    }
}

export function Responses(request: Request, response: Response, nextFunction: NextFunction) {

    response.Ok = <T>(value: T | null = null, httpStatusCode = HttpStatusCode.OK) => {
        const res: GlobalResponse<T | null> = {
            value,
            errors: [],
            success: true
        }
        response.status(httpStatusCode).json(res);
    }

    response.NotFound = (errors) => {
        const res: GlobalResponse<null> = {
            value: null,
            errors: (typeof errors == "string" ? [errors] : errors === undefined ? ["No encontrado"] : errors),
            success: false
        }
        response.status(404).json(res);
    }

    response.Failed = (errors, httpStatusCode = HttpStatusCode.BAD_REQUEST) => {
        const res: GlobalResponse<null> = {
            value: null,
            errors: (typeof errors == "string" ? [errors] : errors === undefined ? ["Error inesperado."] : errors),
            success: false
        }
        response.status(httpStatusCode).json(res);
    }

    response.Error = (errors, httpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR) => {
        const res: GlobalResponse<null> = {
            value: null,
            errors: (typeof errors == "string" ? [errors] : errors === undefined ? ["Error en el servidor."] : errors),
            success: false
        }
        response.status(httpStatusCode).json(res);
    }

    nextFunction();
}