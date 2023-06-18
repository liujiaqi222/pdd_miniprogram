import express from "express";
import { wxLogin, getUserOrders,  } from "../controllers/user.js";

const router = express.Router();

router.get("/login",wxLogin);
router.get("/orders", getUserOrders);


export default router;
