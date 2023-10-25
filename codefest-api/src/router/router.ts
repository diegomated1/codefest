import 'reflect-metadata'
import swaggerUi, { JsonObject } from "swagger-ui-express"
import { Router, Request, Response, NextFunction } from "express"
import { Method, Aplication, Param, HttpStatusCode } from "./RouterTypes"
import { swaggerDefinitions } from './SwaggerDefinitions'
import { ObjectSchema } from 'joi'
import { ServiceError } from '../utils/errors/service.error'
import ui from "uniqid";

type ClassConstructor = new (...args: any[]) => any;
type DecoratorClass = (constructor: Function) => void
type DecoratorFunctionMethod = (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<RequestHandlerController>) => void
type RequestHandlerController = (req: Request, res: Response, next: NextFunction) => Promise<void>
type ExpressMiddlewareType = (req: Request, res: Response, next: NextFunction) => Promise<void> | void

type ParameterDefinition = {
    [key: string]: {
        type: string,
        properties?: ParameterDefinition
    }
}

type ValidatorParameterType = {
    name: string
    from: Param
    validator: ObjectSchema
    required: boolean
}

type Paramaters = { in: Param, name: string, required?: boolean, schemaName?: string, schema?: { "$ref": string } }
type Responses = { [key: string]: { description: string, schema: string } }
type RequestBody = { content: { [key: string]: { schema: { properties: { [key: string]: {} } } } } }
type Routes = { route: Route, path: string, method: Method, routerDecorationsFunctions: TypedPropertyDescriptor<RequestHandlerController> }
type Controllers = { [key: string]: 
    { 
        routes: Routes[], 
        controller: ClassConstructor, 
        authorize: boolean,
        middlewares: ExpressMiddlewareType[]
    } 
}

type Route = {
    tags: string[],
    summary: string,
    description?: string,
    consumes: Aplication[],
    produces: Aplication[],
    security: any[],
    parameters?: Paramaters[],
    middlewares?: ExpressMiddlewareType[],
    responses: Responses,
    requestBody?: RequestBody,
    validators: ValidatorParameterType[],
    authorize: boolean
}

class RouterDesc {

    #services: Record<string, any>;
    #controllers: Controllers;

    #middlewares: ExpressMiddlewareType[]

    #routes: Routes[]
    #expressRouteresponses: Responses
    #routeParameters: Paramaters[]

    #authorize: boolean

    #routesRegistered: string[]
    #expressRouter: Router

    #validators: ValidatorParameterType[]

    #swaggerDocument: JsonObject

    #authMiddleware?: ExpressMiddlewareType
    
    constructor() {
        this.#services = {}
        this.#controllers = {}

        this.#authorize = false;

        this.#middlewares = []

        this.#routes = []
        this.#expressRouteresponses = {}
        this.#routeParameters = []

        this.#routesRegistered = []
        this.#expressRouter = Router()

        this.#validators = []

        this.#swaggerDocument = swaggerDefinitions
        this.#swaggerDocument.definitions = {}

        if (this.#swaggerDocument.tags === undefined) this.#swaggerDocument.tags = []
        if (this.#swaggerDocument.paths === undefined) this.#swaggerDocument.paths = {}
        if (this.#swaggerDocument.servers === undefined ||
            !Array.isArray(this.#swaggerDocument.servers)) this.#swaggerDocument.paths = []

        const http_port = process.env.API_HTTP_PORT ? parseInt(process.env.API_HTTP_PORT) : 3000;
        const host = process.env.API_HOST ?? 'localhost';

        if (http_port !== undefined) {
            this.#swaggerDocument.servers.push({ url: `http://${host}:${http_port}` });
        }
    }

    Router() {
        this.#injectServices();
        //console.log(JSON.stringify(this.#swaggerDocument));
        this.#expressRouter.use('/swagger', swaggerUi.serve, swaggerUi.setup(this.#swaggerDocument));
        return this.#expressRouter;
    }

    addController(name: string, controller: ClassConstructor) {
        this.#controllers[name] = {
            routes: this.#routes, controller, authorize: this.#authorize, middlewares: this.#middlewares
        };
        this.#routes = []
        this.#authorize = false
        this.#middlewares = []
    }

    addService<T>(service: T) {
        try {
            if (service === null || typeof service !== 'object') throw new Error();

            const serviceType = service.constructor.name;
            this.#services[serviceType] = service;
        } catch (error) {
            console.log("No se pudieron añadir algunos servicios");
        }
    }

    addRoute(path: string, method: Method, routerDecorationsFunctions: TypedPropertyDescriptor<RequestHandlerController>, description?: string) {
        var _route: Route = {
            consumes: [Aplication.json],
            produces: [Aplication.json],
            responses: this.#expressRouteresponses,
            summary: description || "",
            parameters: this.#routeParameters,
            middlewares: this.#middlewares,
            tags: [],
            validators: this.#validators,
            security: [],
            authorize: this.#authorize
        }
        if(this.#authorize){
            _route.security.push({
                bearerAuth: [],
            })
        }
        
        this.#routeParameters.reverse().forEach((param, i) => {
            if (param.in == Param.body && param.schema && param.schemaName) {
                if (_route.requestBody == null) {
                    _route.requestBody = {
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {}
                                }
                            }
                        }
                    }
                }
                _route.requestBody.content["application/json"].schema.properties[param.schemaName] = {
                    $ref: param.schema.$ref
                }
            }else if (param.in == Param.param && !path.includes(`{${param.name}}`)) {
                console.log(`cant add route: ${path}, left param: ${param.name}`);
                return;
            }
        });
        _route.parameters = _route.parameters?.filter(r=>r.in != Param.body);
        
        this.#routes.push({ route: _route, path, routerDecorationsFunctions, method });
        this.#expressRouteresponses = {}
        this.#routeParameters = []
        this.#middlewares = []
        this.#validators = []
        this.#authorize = false;
    }

    addMiddlewares(middlewares: ExpressMiddlewareType[]) {
        this.#middlewares.push(...middlewares)
    }

    addParameters(from: Param, schemaName: string, schemeObject: ObjectSchema | string, required: boolean = true) {
        const _schemeName = `${schemaName}${ui.time()}`;
        this.#routeParameters.push({
            in: from, name: schemaName,
            schemaName: schemaName ?? undefined,
            schema: schemaName ? { $ref: `#/definitions/${_schemeName}` } : undefined,
            required
        });
        if (typeof schemeObject == "string") {
            this.#swaggerDocument.definitions[_schemeName] = { type: schemeObject }
        } else {
            this.#validators.push({ name: schemaName, from, validator: schemeObject, required });
            const properties: ParameterDefinition = {};
            Object.entries(schemeObject.describe().keys).forEach(([k, v]) => {
                properties[k] = { type: (v as any).type }
            });
            this.#swaggerDocument.definitions[`${_schemeName}`] = {
                type: "object", properties
            }
        }
    }

    addResponses(httpStatusCode: HttpStatusCode, description?: string, response?: string) {
        this.#expressRouteresponses[httpStatusCode] = {
            description: description ?? "",
            schema: response ?? ""
        }
    }

    setAuthorize() {
        this.#authorize = true;
    }

    addAuthMiddleware(authMiddleware: ExpressMiddlewareType){
        this.#authMiddleware = authMiddleware;
    }

    #injectServices() {
        Object.entries(this.#controllers).forEach(entrie => {
            try {
                let controllerName = entrie[0];
                let routes = entrie[1].routes;
                let controller = entrie[1].controller;
                let controllerMiddlewares = entrie[1].middlewares;
                this.#swaggerDocument.tags.push({
                    name: controllerName
                });

                const paramTypes = Reflect.getMetadata('design:paramtypes', controller) || [];

                const args = paramTypes.map((paramType: any) => {
                    const service = this.#services[paramType.name];
                    return service;
                });
                args.forEach((a: any) => {
                    if (a === undefined) throw new Error();
                });
                let _controller = new controller(...args);

                routes.forEach(route => {
                    let method = route.method;
                    let routePath = `/${controllerName}${route.path}`;
                    try {
                        this.#routesRegistered.push(`${route.method} ${routePath}`);
                        if (this.#swaggerDocument.paths[routePath] == undefined) {
                            this.#swaggerDocument.paths[routePath] = {};
                        }
                        route.route.tags.push(controllerName)
                        const { middlewares, validators, ...data } = route.route;
                        this.#swaggerDocument.paths[routePath][method] = data;
                        let expressPath = routePath.replace(/\{/g, ':').replace(/\}/g, '');
                        let routeMiddlewares = route.route.middlewares || [];

                        let  _middlewares: ExpressMiddlewareType[] = []
                        
                        if(entrie[1].authorize || route.route.authorize){
                            route.route.security.push({
                                bearerAuth: [],
                            });
                            if(this.#authMiddleware){
                                _middlewares.push(this.#authMiddleware);
                            };
                        }

                        _middlewares.push(validatorMiddleware(route.route.validators));
                        _middlewares.push(...routeMiddlewares);
                        _middlewares.push(...controllerMiddlewares);
                        switch (method) {
                            case Method.get: this.#expressRouter.get(expressPath, _middlewares, route.routerDecorationsFunctions.value!.bind(_controller)); break
                            case Method.post: this.#expressRouter.post(expressPath, _middlewares, route.routerDecorationsFunctions.value!.bind(_controller)); break
                            case Method.put: this.#expressRouter.put(expressPath, _middlewares, route.routerDecorationsFunctions.value!.bind(_controller)); break
                            case Method.patch: this.#expressRouter.patch(expressPath, _middlewares, route.routerDecorationsFunctions.value!.bind(_controller)); break
                            case Method.delete: this.#expressRouter.delete(expressPath, _middlewares, route.routerDecorationsFunctions.value!.bind(_controller)); break
                        }
                    } catch (error) {
                        console.log((error as Error).message)
                        console.log(`cant put route: ${routePath}`)
                    }
                });

                this.#middlewares = [];
            } catch (error) {
                console.log("No se pudieron añadir algunos controladores");
            }
        });
    }
}

const validatorMiddleware = (validators: ValidatorParameterType[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Promise.all(validators.map((v) => {
                let data;
                switch (v.from) {
                    case Param.header:
                        data = req.get(v.name); break;
                    case Param.body:
                        data = req.body[v.name]; break;
                    case Param.param:
                        data = req.params[v.name]; break;
                    case Param.query:
                        data = req.query[v.name]; break;
                }
                if (!data && v.required) throw new ServiceError(`No existe '${v.name}' en el '${v.from}'.`)
                return v.validator.validateAsync(data, { abortEarly: false });
            }));
            next();
        } catch (error) {
            next(error)
        }
    }
}


var _router = new RouterDesc();

export function Controller(): DecoratorClass
export function Controller(controller?: string, description?: string): DecoratorClass
export function Controller(controller?: string, description?: string) {
    return function (constructor: ClassConstructor) {
        _router.addController(controller || constructor.name.toLowerCase().replace("controller", ""), constructor);
    };
}

export function Get(): DecoratorFunctionMethod
export function Get(route: string, description?: string): DecoratorFunctionMethod
export function Get(route?: string, description?: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<RequestHandlerController>) {
        _router.addRoute(route || "", Method.get, descriptor, description);
    };
}

export function Post(): DecoratorFunctionMethod
export function Post(route: string, description?: string): DecoratorFunctionMethod
export function Post(route?: string, description?: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<RequestHandlerController>) {
        _router.addRoute(route || "", Method.post, descriptor, description);
    };
}

export function Put(): DecoratorFunctionMethod
export function Put(route: string, description?: string): DecoratorFunctionMethod
export function Put(route?: string, description?: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<RequestHandlerController>) {
        _router.addRoute(route || "", Method.put, descriptor, description);
    };
}

export function Delete(): DecoratorFunctionMethod
export function Delete(route: string, description?: string): DecoratorFunctionMethod
export function Delete(route?: string, description?: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<RequestHandlerController>) {
        _router.addRoute(route || "", Method.delete, descriptor, description);
    };
}

export function Path(): DecoratorFunctionMethod
export function Path(route: string, description?: string): DecoratorFunctionMethod
export function Path(route?: string, description?: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<RequestHandlerController>) {
        _router.addRoute(route || "", Method.patch, descriptor, description);
    };
}

export function FromQuery(schemaName: string): DecoratorFunctionMethod;
export function FromQuery(schemaName: string, required?: boolean): DecoratorFunctionMethod;
export function FromQuery(schemaName: string, schemeObject?: ObjectSchema | string, required?: boolean): DecoratorFunctionMethod;
export function FromQuery(param1: string, param2?: ObjectSchema | string | boolean, param3?: boolean): DecoratorFunctionMethod {
    return function (target: any, propertyKey: string) {
        if(param2 == undefined || param2 == null){
            _router.addParameters(Param.query, param1, "string");
        }else if(typeof param2 == "boolean"){
            _router.addParameters(Param.query, param1, "string", param2);
        }else{
            _router.addParameters(Param.query, param1, param2 ?? "string", param3);
        }
    };
}

export function FromBody(schemaName: string): DecoratorFunctionMethod;
export function FromBody(schemaName: string, required?: boolean): DecoratorFunctionMethod;
export function FromBody(schemaName: string, schemeObject?: ObjectSchema | string, required?: boolean): DecoratorFunctionMethod;
export function FromBody(param1: string, param2?: ObjectSchema | string | boolean, param3?: boolean): DecoratorFunctionMethod {
    return function (target: any, propertyKey: string) {
        if(param2 == undefined || param2 == null){
            _router.addParameters(Param.body, param1, "string");
        }else if(typeof param2 == "boolean"){
            _router.addParameters(Param.body, param1, "string", param2);
        }else{
            _router.addParameters(Param.body, param1, param2 ?? "string", param3);
        }
    };
}

export function FromHeader(schemaName: string): DecoratorFunctionMethod;
export function FromHeader(schemaName: string, required?: boolean): DecoratorFunctionMethod;
export function FromHeader(schemaName: string, schemeObject?: ObjectSchema | string, required?: boolean): DecoratorFunctionMethod;
export function FromHeader(param1: string, param2?: ObjectSchema | string | boolean, param3?: boolean): DecoratorFunctionMethod {
    return function (target: any, propertyKey: string) {
        if(param2 == undefined || param2 == null){
            _router.addParameters(Param.header, param1, "string");
        }else if(typeof param2 == "boolean"){
            _router.addParameters(Param.header, param1, "string", param2);
        }else{
            _router.addParameters(Param.header, param1, param2 ?? "string", param3);
        }
    };
}

export function FromParam(schemaName: string): DecoratorFunctionMethod
export function FromParam(schemaName: string, required?: boolean): DecoratorFunctionMethod;
export function FromParam(schemaName: string, schemeObject?: ObjectSchema | string, required?: boolean): DecoratorFunctionMethod;
export function FromParam(param1: string, param2?: ObjectSchema | string | boolean, param3?: boolean): DecoratorFunctionMethod {
    return function (target: any, propertyKey: string) {
        if(param2 == undefined || param2 == null){
            _router.addParameters(Param.param, param1, "string");
        }else if(typeof param2 == "boolean"){
            _router.addParameters(Param.param, param1, "string", param2);
        }else{
            _router.addParameters(Param.param, param1, param2 ?? "string", param3);
        }
    };
}

export function Responses(httpStatusCode: HttpStatusCode): DecoratorFunctionMethod
export function Responses(httpStatusCode: HttpStatusCode, description: string, response: string): DecoratorFunctionMethod
export function Responses(httpStatusCode: HttpStatusCode, description?: string, response?: string) {
    return function (target: any, propertyKey: string) {
        _router.addResponses(httpStatusCode, response);
    };
}
export function Middleware(middleware: ExpressMiddlewareType): DecoratorFunctionMethod
export function Middleware(middlewares: ExpressMiddlewareType[]): DecoratorFunctionMethod
export function Middleware(middlewares: any): DecoratorFunctionMethod {
    return function (target: any, propertyKey: string) {
        if (Array.isArray(middlewares))
            _router.addMiddlewares(middlewares);
        else
            _router.addMiddlewares([middlewares]);
    };
}

export function Middlewares(middleware: ExpressMiddlewareType): DecoratorClass
export function Middlewares(middlewares: ExpressMiddlewareType[]): DecoratorClass
export function Middlewares(middlewares: any) {
    return function (constructor: ClassConstructor) {
        if (Array.isArray(middlewares))
            _router.addMiddlewares(middlewares);
        else
            _router.addMiddlewares([middlewares]);
    };
}

export function Authorize(): DecoratorFunctionMethod {    
    return function (target: any, propertyKey: string) {
        _router.setAuthorize();
    };
}

export function AuthorizeAll() {
    return function (constructor: ClassConstructor) {
        _router.setAuthorize();
    };
}


export default _router