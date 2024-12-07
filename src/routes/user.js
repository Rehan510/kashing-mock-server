import express from "express";
import {
  getUser,
  potUser

} from "../controller/user/index.js";
const router = express.Router();

//= ===============================
// Public routes
//= ===============================
router.get("/", getUser);
router.post("/", potUser);


export default router;
