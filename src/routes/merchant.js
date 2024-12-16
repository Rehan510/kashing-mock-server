import express from "express";
import {
    find,
    update

} from "../controller/merchant/index.js";
const router = express.Router();


router.get("/", find);
router.post("/", update);



export default router;
