import express from "express";
import { authenticationMiddleWare } from "./../middleware/authentication.js";
import { changeGroupUrl, getConfig } from "../controllers/config.js";

const router = express.Router();

router.post("/changeGroupUrl", authenticationMiddleWare, changeGroupUrl);
router.get("/", getConfig);

export default router;
