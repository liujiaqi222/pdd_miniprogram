import express from "express";
import {
  getAllOrders,
  createNewGroup,
  deleteGroup,
  createNewGroupByOrderId,
  getOrderById,
} from "../controllers/order.js";
const router = express.Router();

router.route("/").get(getAllOrders).post(createNewGroup).delete(deleteGroup);

router.route("/byId").get(getOrderById).post(createNewGroupByOrderId);

export default router;
