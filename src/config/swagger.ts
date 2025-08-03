import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "POS & Inventory Management API",
      version: "1.0.0",
      description: "API documentation for POS & Inventory System",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
