import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import { generateToken } from "../../utils/jwtHelper";

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const {
    company_id,
    name,
    phone,
    email,
    password,
    role,
    status,
    CREATED_BY,
    CREATION_DATE,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO USERS (company_id,name,phone,email,password,role,status,CREATED_BY,CREATION_DATE) VALUES ($1, $2, $3,$4,$5) RETURNING *",
      [
        company_id,
        name,
        phone,
        email,
        hashedPassword,
        role,
        status,
        CREATED_BY,
        CREATION_DATE,
      ]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { PHONE, PASSWORD } = req.body;
  try {
    const result = await pool.query("SELECT * FROM USERS WHERE PHONE = $1", [
      PHONE,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(PASSWORD, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
