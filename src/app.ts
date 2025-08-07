import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import setupRoutes from "./routes/setupRoutes";
import productRoutes from "./routes/ProductRoutes";
import { logger } from "./middleware/logger";
import { pool } from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(logger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use("/setup", setupRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

// Database Connection

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
});
