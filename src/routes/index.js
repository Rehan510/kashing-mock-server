import express from "express";
import wallets from "./wallets.js";
const router = express.Router();
const defaultRoutes = [
  { path: "/wallets", route: wallets, isActive: true },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
