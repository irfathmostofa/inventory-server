import { Request, Response } from "express";
import { pool } from "../config/db";
import { uploadFile } from "../models/uploadFile";

export const AddNewCompany = async (req: Request, res: Response) => {
  try {
    const logoFilename = await uploadFile(req, res);
    const { name, address, phone, email, status, CREATED_BY, CREATION_DATE } =
      req.body;
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

export const AddProductCategory = async (req: Request, res: Response) => {
  try {
    const { company_id, name, parent_id, status, CREATED_BY, CREATION_DATE } =
      req.body;
    const result = await pool.query(
      `INSERT INTO PRODUCT_CATEGORIES (company_id,name,parent_id,status,CREATED_BY,CREATION_DATE)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [company_id, name, parent_id, status, CREATED_BY, CREATION_DATE]
    );

    res.status(201).json({ "Product Category": result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const deleteProductCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await pool.query(`DELETE FROM PRODUCT_CATEGORIES WHERE id=$1`, [id]);

    res.status(201).json({ Message: "Product Category Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const AddUOM = async (req: Request, res: Response) => {
  try {
    const { company_id, name, status, CREATED_BY, CREATION_DATE } = req.body;
    const result = await pool.query(
      `INSERT INTO UOM (company_id, name, status, CREATED_BY, CREATION_DATE )
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [company_id, name, status, CREATED_BY, CREATION_DATE]
    );

    res.status(201).json({ UOM: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUOM = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await pool.query(`DELETE FROM UOM WHERE id=$1`, [id]);

    res.status(201).json({ Message: "UOM Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const AddLocation = async (req: Request, res: Response) => {
  try {
    const { company_id, name, address, status, CREATED_BY, CREATION_DATE } =
      req.body;
    const result = await pool.query(
      `INSERT INTO LOCATIONS (company_id, name,address, status, CREATED_BY, CREATION_DATE )
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [company_id, name, address, status, CREATED_BY, CREATION_DATE]
    );

    res.status(201).json({ Location: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await pool.query(`DELETE FROM Location WHERE id=$1`, [id]);

    res.status(201).json({ Message: "Location Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const AddSuppliers = async (req: Request, res: Response) => {
  try {
    const {
      company_id,
      name,
      contact_person,
      phone,
      email,
      address,
      status,
      CREATED_BY,
      CREATION_DATE,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO SUPPLIERS (company_id, name,contact_person,phone,email,address, status, CREATED_BY, CREATION_DATE )
       VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9) RETURNING *`,
      [
        company_id,
        name,
        contact_person,
        phone,
        email,
        address,
        status,
        CREATED_BY,
        CREATION_DATE,
      ]
    );

    res.status(201).json({ SUPPLIERS: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteSuppliers = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await pool.query(`DELETE FROM SUPPLIERS WHERE id=$1`, [id]);

    res.status(201).json({ Message: "Location Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
