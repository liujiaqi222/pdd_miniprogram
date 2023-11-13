import express from "express";
import { authenticationMiddleWare } from "./../middleware/authentication.js";
import { changeConfig, getConfig } from "../controllers/config.js";

const router = express.Router();

router.post("/changeConfig", authenticationMiddleWare, changeConfig);
router.get("/", getConfig);

export default router;
