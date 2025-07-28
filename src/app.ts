import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from './routes/authRoutes';
import { logger } from "./middleware/logger";
import { pool } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

// Routes
app.use("/users", userRoutes);
app.use('/auth', authRoutes);

// Database Connection
pool
  .query("SELECT NOW()")
  .then((res) => console.log("🟢 PostgreSQL Connected:", res.rows[0].now))
  .catch((err) => console.error("🔴 PostgreSQL Connection Error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
