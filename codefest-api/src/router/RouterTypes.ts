
// ENUMS
export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503
}

export enum Param {
    param = "path",
    body = "body",
    query = "query",
    header = "header"
}

export enum Method {
    get = "get",
    post = "post",
    put = "put",
    patch = "patch",
    delete = "delete"
}

export enum Aplication {
    json = "application/json",
    xml = "application/xml"
}