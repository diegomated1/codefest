import { HttpStatusCode } from "../../router/RouterTypes";

export class ServiceError extends Error {

    httpStatusCode: HttpStatusCode

    constructor(msg: string, _httpStatusCode: HttpStatusCode = HttpStatusCode.BAD_REQUEST) {
        super(msg);
        this.httpStatusCode = _httpStatusCode;
    }
}