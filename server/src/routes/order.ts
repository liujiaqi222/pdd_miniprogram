import express from "express";
import {
  getAllOrders,
  createNewGroup,
  deleteGroup,
  createNewGroupByOrderId,
} from "../controllers/order.js";
const router = express.Router();

router.route("/").get(getAllOrders).post(createNewGroup).delete(deleteGroup);

router.post("/byId", createNewGroupByOrderId)

export default router;
