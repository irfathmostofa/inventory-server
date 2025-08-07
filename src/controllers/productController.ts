import { Request, response, Response } from "express";
import { pool } from "../config/db";

export const addProduct = async (req: Request, res: Response) => {
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
  try {
    const result = await pool.query(
      "INSERT INTO PRODUCTS (company_id,name,contact_person,phone,email,address,status,CREATED_BY,CREATION_DATE) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
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
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query("DELETE FROM PRODUCTS WHERE id=$1", [id]);
  res.json({ message: "Product Deleted Successfully" });
};

export const addProductBatch = async (req: Request, res: Response) => {
  const {
    company_id,
    product_id,
    batch_number,
    manufacture_date,
    expiry_date,
    status,
    CREATED_BY,
    CREATION_DATE,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO PRODUCT_BATCHES (company_id,product_id,batch_number,manufacture_date,expiry_date,status,CREATED_BY,CREATION_DATE) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *",
      [
        company_id,
        product_id,
        batch_number,
        manufacture_date,
        expiry_date,
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

export const deleteProductBatch = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query("DELETE FROM PRODUCT_BATCHES WHERE id=$1", [id]);
  res.json({ message: "Product Batch Deleted Successfully" });
};
