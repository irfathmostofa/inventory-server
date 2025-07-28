import express from "express";
import {
  getAllUsersController,
  getUserByIdController,
} from "../controllers/User/userController";

const router = express.Router();

router.post("/get-all-user", getAllUsersController);
router.post("/get-all-user-by-id", getUserByIdController);

export default router;
