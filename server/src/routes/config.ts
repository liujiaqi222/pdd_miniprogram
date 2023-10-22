import express from "express";
import { authenticationMiddleWare } from "./../middleware/authentication.js";
import { changeGroupUrl, getGroupeUrl } from "../controllers/config.js";

const router = express.Router();

router.post("/changeGroupUrl", authenticationMiddleWare, changeGroupUrl);
router.get("/getGroupUrl", getGroupeUrl);

export default router;
