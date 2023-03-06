import { Request, Response } from 'express';
import { Order } from '../models/order.js';
import { isValidUrl, reverseShortUrl } from '../util/index.js';
import { getOrderData } from '../db/getOrder.js';

export const getAllOrders = async (req: Request, res: Response) => {
  let { goodsName, currentPage, pageSize } = req.query as { goodsName?: string, currentPage?: number, pageSize?: number }
  pageSize = Number(pageSize) || 10

  const queryObject: {
    goodsName?: {
      $regex: string,
      $options: string
    }
  } = {}
  if (goodsName) {
    queryObject.goodsName = {
      $regex: goodsName as string,
      $options: 'i'
    }
  }
  console.log(req.query)
  const result = await Order.find(queryObject).limit(pageSize).skip(pageSize * Number(currentPage) || 0)
  res.json(result)
}


export const createNewGroup = async (req: Request, res: Response) => {
  const { url } = req.body
  if (!url) return res.json({ message: 'URL错误', success: false })
  const reverseResult = await reverseShortUrl(url)
  if (!reverseResult.success) return res.json({ message: 'URL错误', success: false })
  const orderId = isValidUrl(reverseResult.longUrl)
  if (!orderId) return res.json({ message: 'URL错误', success: false })
  const uploadResult = await getOrderData(orderId)
  res.json(uploadResult)
}
