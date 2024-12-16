import express from "express";
import { findAll } from "../controller/invoices/index.js";
const router = express.Router();


router.get("/", findAll);




export default router;
