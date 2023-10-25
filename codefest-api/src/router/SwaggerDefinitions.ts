import { JsonObject } from "swagger-ui-express";

export const swaggerDefinitions: JsonObject = {
  openapi: '3.1.0',
  info: {
    title: 'API EVENTS',
    version: '1.0.0',
  },
  servers: [],
  components: {
    securitySchemes: {
      bearerAuth: {
        description: "JWT Authorization",
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      }
    }
  }
}