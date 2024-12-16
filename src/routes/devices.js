import express from "express";
import {
    findAll,
    find,
    add,
    update,
    deleteById,
    findAllStocks,
    updateAllStocks,
    findAllSales,
    getConfig,
    updateConfig,
    statusHistory

} from "../controller/devices/index.js";
const router = express.Router();


router.get("/", findAll);
router.get("/:id/info", find);
router.get("/:id/products", findAllStocks);
router.post("/:id/products", updateAllStocks);
router.get("/:id/sales", findAllSales);
router.get("/:id/config", getConfig);
router.post("/:id/config", updateConfig);
router.post("/:id/statusHistory", statusHistory);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", deleteById);


export default router;
