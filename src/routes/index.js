import express from "express";
import userManagement from "./user.js";
const router = express.Router();
const defaultRoutes = [
  { path: "/user", route: userManagement, isActive: true },
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
export default router;
