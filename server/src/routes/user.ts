import express from "express";
import { wxLogin, getUserOrders, getUserCode } from "../controllers/user.js";

const router = express.Router();

router.get("/login",wxLogin);
router.get("/orders", getUserOrders);
router.get('/code', getUserCode);


export default router;
