import express from "express";
import { wxLogin } from "../controllers/user.js";

const router = express.Router();

router.route("/login").get(wxLogin);

export default router;
