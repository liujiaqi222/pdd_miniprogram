import { Request, Response } from "express";
import { Order } from "../models/order.js";
import { isValidUrl, reverseShortUrl, getOrderData } from "../util/index.js";
import { saveOrderData } from "../db/saveOrder.js";

type QueryObject = {
  goodsName?: {
    $regex: string;
    $options: string;
  };
  groupRemainCount?: {
    $eq: number;
  };
};

export const getAllOrders = async (req: Request, res: Response) => {
  let { goodsName, currentPage, pageSize, listType } = req.query as {
    goodsName?: string;
    currentPage?: number;
    pageSize?: number;
    listType?: "newGroup" | "shortOne";
  };
  pageSize = Number(pageSize) || 10;

  const queryObject: QueryObject = {};

  if (goodsName) {
    queryObject.goodsName = {
      $regex: goodsName as string,
      $options: "i",
    };
  }
  if (listType === "shortOne") {
    queryObject.groupRemainCount = {
      $eq: 1,
    };
  }
  console.log(req.query);
  const result = await Order.find(queryObject)
    .limit(pageSize)
    .skip(pageSize * Number(currentPage) || 0)
    .sort("-createdAt")
    .exec();
  console.log(result);
  res.json(result);
};

// 可以根据拼多多拼团二维码识别后的短url创建新的拼单,这个接口给前端调用
export const createNewGroup = async (req: Request, res: Response) => {
  const url = req.body.url;
  if (!url) return res.json({ message: "URL不存在！", success: false });
  const reverseUrlResult = await reverseShortUrl(url);
  if (!reverseUrlResult.success)
    return res.json({ message: "URL错误", success: false });
  const longUrl = reverseUrlResult.longUrl;
  const validateUrlResult = isValidUrl(longUrl);
  if (!validateUrlResult.isValid)
    return res.json({ message: "URL错误", success: false });
  const isExist = await Order.findOne({
    groupOrderId: validateUrlResult.orderId,
  }).exec();
  if (isExist) return res.json({ message: "该拼单已存在", success: false });
  const fetchResult = await getOrderData(validateUrlResult.orderId);
  if (!fetchResult) return res.json({ message: "URL错误", success: false });
  const saveResult = await saveOrderData(fetchResult).catch(() => {
    res.json({ success: false, message: "上传失败！" });
  });
  res.json(saveResult);
};

// 根据groupOrderId或者原始url创建新的拼单，这个接口方便我上传新的拼单
export const createNewGroupByOrderId = async (req: Request, res: Response) => {
  let { groupOrderId, longUrl } = req.body;
  if (!groupOrderId && !longUrl) {
    return res.json({ message: "groupOrderId和url不存在", success: false });
  }
  if (longUrl) {
    const validateUrlResult = isValidUrl(longUrl);
    if (!validateUrlResult.isValid) {
      return res.json({ message: "URL错误", success: false });
    }
    groupOrderId = validateUrlResult.orderId;
  }
  console.log(groupOrderId)
  const isExist = await Order.findOne({ groupOrderId }).exec();
  if (isExist)
    return res.json({ message: "groupOrderId已存在", success: false });
  const fetchResult = await getOrderData(groupOrderId);
  if (!fetchResult) return res.json({ message: "URL错误", success: false });
  const saveResult = await saveOrderData(fetchResult).catch(() => {
    res.json({ success: false, message: "上传失败！" });
  });
  res.json(saveResult);
};

export const deleteGroup = async (req: Request, res: Response) => {
  const { groupOrderId } = req.body;
  if (!groupOrderId)
    return res.json({ message: "groupOrderId不存在", success: false });

  const result = await Order.deleteOne({ groupOrderId }).exec();
  res.json({
    success: true,
    data: result,
  });
};
