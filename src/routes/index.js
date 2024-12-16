import express from "express";
import wallets from "./wallets.js"
import stores from "./stores.js"
import roles from "./roles.js"
import subscription from "./subscription.js"
import paymentMethods from "./paymentMethods.js"
import invoices from "./invoices.js"
import documents from "./documents.js"
import devices from "./devices.js"
import products from "./product.js"
import transactions from "./transaction.js"
import statements from "./statements.js"
import users from "./users.js"
import taxRates from "./taxRates.js"
import reports from "./reports.js"
import merchant from "./merchant.js"
const router = express.Router();
const defaultRoutes = [
  { path: "/documents", route: documents, isActive: true },
  { path: "/invoices", route: invoices, isActive: true },
  { path: "/wallets", route: wallets, isActive: true },
  { path: "/stores", route: stores, isActive: true },
  { path: "/roles", route: roles, isActive: true },
  { path: "/subscription", route: subscription, isActive: true },
  { path: "/paymentMethods", route: paymentMethods, isActive: true },
  { path: "/devices", route: devices, isActive: true },
  { path: "/products", route: products, isActive: true },
  { path: "/transactions", route: transactions, isActive: true },
  { path: "/statements", route: statements, isActive: true },
  { path: "/users", route: users, isActive: true },
  { path: "/tax-rates", route: taxRates, isActive: true },
  { path: "/reports", route: reports, isActive: true },
  { path: "/merchant", route: merchant, isActive: true },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
