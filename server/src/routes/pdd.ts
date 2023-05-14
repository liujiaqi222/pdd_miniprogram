import express from "express";
import { fetchPdd } from "../controllers/pdd.js";

const router = express.Router();

router.post("/", fetchPdd);

export default router;
