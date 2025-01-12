require("dotenv").config({ path: `${process.cwd()}/.env` });

const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "API Documentation", 
      version: "1.0.0", 
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: process.env.BACKEND_URL,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./route/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
