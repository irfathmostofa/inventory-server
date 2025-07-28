import { pool } from "../config/db";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || "User not found";
};

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT *FROM users");
  return result.rows;
};
