import express from "express";
import { wxLogin, getUserOrders } from "../controllers/user.js";
import { authSignMiddleware } from "../middleware/authSign.js";

const router = express.Router();

router.get("/login", authSignMiddleware, wxLogin);
router.get("/orders", authSignMiddleware, getUserOrders);

export default router;
