import { Request, Response } from 'express';
import { Order } from '../models/order.js';
import { isValidUrl, reverseShortUrl, getOrderData, } from '../util/index.js';
import { saveOrderData } from '../db/saveOrder.js';

type QueryObject = {
  goodsName?: {
    $regex: string,
    $options: string
  },
  groupRemainCount?: {
    $eq: number
  }
}

export const getAllOrders = async (req: Request, res: Response) => {
  let { goodsName, currentPage, pageSize, listType } = req.query as { goodsName?: string, currentPage?: number, pageSize?: number, listType?: 'newGroup' | 'shortOne' }
  pageSize = Number(pageSize) || 10

  const queryObject: QueryObject = {}

  if (goodsName) {
    queryObject.goodsName = {
      $regex: goodsName as string,
      $options: 'i'
    }
  }
  if (listType === 'shortOne') {
    queryObject.groupRemainCount = {
      $eq: 1
    }
  }
  console.log(req.query)
  const result = await Order.find(queryObject).limit(pageSize).skip(pageSize * Number(currentPage) || 0).sort('-createdAt').exec()
  res.json(result)
}


export const createNewGroup = async (req: Request, res: Response) => {
  const { url } = req.body
  if (!url) return res.json({ message: 'URL错误', success: false })
  const reverseUrlResult = await reverseShortUrl(url)
  if (!reverseUrlResult.success) return res.json({ message: 'URL错误', success: false })
  const orderId = isValidUrl(reverseUrlResult.longUrl)
  if (!orderId) return res.json({ message: 'URL错误', success: false })
  const fetchResult = await getOrderData(orderId)
  if (!fetchResult) return res.json({ message: 'URL错误', success: false })
  const saveResult = await saveOrderData(fetchResult).catch(() => {
    res.json({ success: false, message: '上传失败！' })
  })
  res.json(saveResult)
}


const fetchResult = await getOrderData('2154318300507153606')
if (fetchResult) {

  const saveResult = await saveOrderData(fetchResult)
}