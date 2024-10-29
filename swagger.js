const { json } = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "X-API-KEY",
          description: "Introduce la API Key en el campo de Authorization",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Asegúrate de apuntar a las rutas de tus endpoints
};

const docJ = JSON.parse(JSON.stringify(swaggerOptions)) 
console.log(docJ);
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
