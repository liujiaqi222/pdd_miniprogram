import QrScanner from 'qr-scanner';
import { Request, Response } from 'express';
import { Order } from '../models/order';

export const getAllOrders = async (req: Request, res: Response) => {
  const { goodsName, currentPage, pageSize } = req.query
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
  const result = await Order.find(queryObject).limit(Number(pageSize) || 10).skip(Number(pageSize) * Number(currentPage) || 0)
  console.log(result)
  res.json(result)
}


export const createNewGroup = (req: Request, res: Response) => {
  
}
