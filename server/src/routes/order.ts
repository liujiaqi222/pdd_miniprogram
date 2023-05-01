import express from 'express'
import { getAllOrders, createNewGroup,deleteGroup } from '../controllers/order.js'
const router = express.Router()

router.route('/').get(getAllOrders).post(createNewGroup).delete(deleteGroup)

export default router