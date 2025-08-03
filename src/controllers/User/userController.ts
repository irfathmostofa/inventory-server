import { Request, Response } from "express";

import { pool } from "../../config/db";

export const registerCompany = async (req: Request, res: Response) => {
  const { name,address,phone,email,logo,status,CREATED_BY,CREATION_DATE } = req.body;
  try {

    const result = await pool.query(
      "INSERT INTO USERS (name,address,phone,email,logo,status,CREATED_BY,CREATION_DATE) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *",
      [name,address,phone,email,logo,status,CREATED_BY,CREATION_DATE]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT *FROM users");
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(result.rows);
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
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
