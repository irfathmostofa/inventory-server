import { Request, response, Response } from "express";
import { pool } from "../config/db";
export const addPO = async (req: Request, res: Response) => {
  const {
    company_id,
    supplier_id,
    order_date,
    total_amount,
    status,
    CREATED_BY,
    CREATION_DATE,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO PURCHASE_ORDERS (company_id,supplier_id,order_date,total_amount,status,CREATED_BY,CREATION_DATE) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *",
      [
        company_id,
        supplier_id,
        order_date,
        total_amount,
        status,
        CREATED_BY,
        CREATION_DATE,
      ]
    );
    res.status(201).json({ msg: result.rows[0] });
  } catch (error) {
    res.json({ message: error });
  }
};
export const addPOItem = async (req: Request, res: Response) => {
  const {
    purchase_order_id,
    product_id,
    batch_id,
    quantity,
    unit_price,
    total_price,
    CREATED_BY,
    CREATION_DATE,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO PURCHASE_ORDER_ITEMS (purchase_order_id,product_id,batch_id,quantity,unit_price,total_price,CREATED_BY,CREATION_DATE) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *",
      [
        purchase_order_id,
        product_id,
        batch_id,
        quantity,
        unit_price,
        total_price,
        CREATED_BY,
        CREATION_DATE,
      ]
    );
    res.status(201).json({ msg: result.rows[0] });
  } catch (error) {
    res.json({ message: error });
  }
};

export const deletePo = async (req: Request, res: Response) => {
  const { id } = req.body;
  await pool.query("DELETE FROM PURCHASE_ORDERS WHERE id=$1", [id]);
  res.json({ message: "PO Deleted Successfully" });
};
