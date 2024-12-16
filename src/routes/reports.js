import express from "express";
import {
    findAll,

} from "../controller/reports/index.js";
const router = express.Router();


router.get("/filter", findAll);



export default router;
