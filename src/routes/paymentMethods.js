import express from "express";
import {
    findAll,
    add,
    update,
} from "../controller/paymentMethods/index.js";
const router = express.Router();


router.get("/", findAll);
router.post("/cards", add);
router.put("/default", update);



export default router;
