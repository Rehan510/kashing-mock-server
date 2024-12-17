import express from "express";
import { getAdrress } from "../controller/stores/index.js";
const router = express.Router();


router.get("/", getAdrress);


export default router;
