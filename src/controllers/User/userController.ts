import { Request, Response } from "express";
import { getAllUsers } from "../../models/userModel";
import { findUserById } from "../../models/userModel";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await findUserById(id);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
