import express from "express";
import userManagement from "./user.js";
import wallets from "./wallets.js";
const router = express.Router();
const defaultRoutes = [
  { path: "/", route: userManagement, isActive: true },
  { path: "/wallets", route: wallets, isActive: true },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
