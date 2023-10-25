import { NextFunction, Request, Response } from "express";
import { ServiceError } from "../utils/errors/service.error";
import { ValidationError } from 'joi'
import { JsonWebTokenError } from "jsonwebtoken";
import { HttpStatusCode } from "../router/RouterTypes";

export function ErrorMiddleware(error: Error, request: Request, response: Response, nextFunction: NextFunction) {
    console.log(error);
    if (error instanceof ValidationError) {
        response.Failed(error.details.map(det => det.message))
    } else if (error instanceof ServiceError) {
        response.Failed(error.message, error.httpStatusCode);
    } else if (error instanceof JsonWebTokenError) {
        response.Failed(error.message, HttpStatusCode.UNAUTHORIZED)
    } else {
        response.Error();
    }
    nextFunction();
}