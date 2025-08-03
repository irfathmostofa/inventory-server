import express from "express";
import {
  getAllUsersController,
  getUserByIdController,
} from "../controllers/userController";

const router = express.Router();

// @swagger

router.post("/get-all-user", getAllUsersController);
router.post("/get-all-user-by-id", getUserByIdController);

export default router;
