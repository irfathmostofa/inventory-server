import express from "express";

import { AddNewCompany } from "../controllers/setupController";

const router = express.Router();

// @swagger

router.post("/add-company", AddNewCompany);

export default router;
