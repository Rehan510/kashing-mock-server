import express from "express";
import {
    findAll,
    find,
    add,
    update,
    deleteById
} from "../controller/roles/index.js";
const router = express.Router();


router.get("/", findAll);
router.get("/:id", find);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", deleteById);


export default router;
