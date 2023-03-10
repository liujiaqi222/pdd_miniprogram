import express from 'express'
import { getAllOrders, createNewGroup } from '../controllers/order.js'
const router = express.Router()



router.route('/').get(getAllOrders).post(createNewGroup)

export default router