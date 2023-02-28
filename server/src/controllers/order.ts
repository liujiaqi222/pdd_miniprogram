import QrScanner from 'qr-scanner';
import { Request, Response } from 'express';
import { Order } from '../models/order';

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


export const createNewGroup = (req: Request, res: Response) => {

}
