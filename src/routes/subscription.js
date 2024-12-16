import express from "express";
import {
    findAll,
   
} from "../controller/subscription/index.js";
const router = express.Router();


router.get("/info", findAll);



export default router;
