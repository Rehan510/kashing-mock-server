import express from "express";
import {
    getStatements,
    find,
    add,
    update,
    deleteById
} from "../controller/statements/index.js";
const router = express.Router();


router.get("/", getStatements);
router.get("/:id", find);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", deleteById);


export default router;
