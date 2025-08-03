import { Request, Response } from "express";
import { pool } from "../config/db";
import { uploadFile } from "../models/uploadFile";

export const AddNewCompany = async (req: Request, res: Response) => {
  try {
    // First, upload and optimize the file
    const logoFilename = await uploadFile(req, res);
    console.log(logoFilename);

    // Extract other fields from req.body (logo NOT here)
    const { name, address, phone, email, status, CREATED_BY, CREATION_DATE } =
      req.body;
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
    // Insert into DB using the uploaded filename
    const result = await pool.query(
      `INSERT INTO COMPANY (name, address, phone, email, logo, status, CREATED_BY, CREATION_DATE)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        name,
        address,
        phone,
        email,
        logoFilename,
        status,
        CREATED_BY,
        CREATION_DATE,
      ]
    );

    res.status(201).json({ company: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
