import express from "express";
import { addProduct, deleteProduct } from "../controllers/productController";

const router = express.Router();

// @swagger

router.post("/add-product", addProduct);
router.post("/delete-product", deleteProduct);

export default router;
