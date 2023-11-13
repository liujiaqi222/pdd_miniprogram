import express from "express";
import {
  getAllOrders,
  createNewGroup,
  deleteGroup,
  createNewGroupByOrderId,
  getOrderById,
} from "../controllers/order.js";
import { authSignMiddleware } from "../middleware/authSign.js";
const router = express.Router();

router
  .route("/")
  .get(authSignMiddleware,getAllOrders)
  .post(createNewGroup)
  .delete(deleteGroup);

router
  .route("/byId")
  .get(authSignMiddleware,getOrderById)
  .post(createNewGroupByOrderId);

export default router;
