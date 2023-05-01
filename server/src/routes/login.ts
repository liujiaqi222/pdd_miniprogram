import express from "express";
import { wxLogin } from "../controllers/wxLogin.js";

const router = express.Router();

router.route("/").get(wxLogin);

export default router;
