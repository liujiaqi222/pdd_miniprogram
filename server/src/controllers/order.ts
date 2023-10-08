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
  const result = await Order.find(queryObject)
    .limit(pageSize)
    .skip(pageSize * Number(currentPage) || 0)
    .sort("-createdAt")
    .exec();
  res.json(result);
};

// 可以根据拼多多拼团二维码识别后的短url创建新的拼单,这个接口给前端调用
export const createNewGroup = async (req: Request, res: Response) => {
  const { url, openId, marketPrice } = req.body;
  let longUrl = "";
  if (!url) return res.json({ message: "URL不存在！", success: false });

  // 如果是短链
  if (!url.includes("group_order_id")) {
    const reverseUrlResult = await reverseShortUrl(url);
    if (!reverseUrlResult.success)
      return res.json({ message: "URL错误", success: false });
    longUrl = reverseUrlResult.longUrl;
  } else {
    longUrl = url;
  }
  const validateUrlResult = isValidUrl(longUrl);
  if (!validateUrlResult.isValid)
    return res.json({ message: "URL错误", success: false });
  const isExist = await Order.findOne({
    groupOrderId: validateUrlResult.orderId,
  }).exec();
  if (isExist) return res.json({ message: "该拼单已存在", success: false });
  const fetchResult = await getOrderData(validateUrlResult.orderId);
  if (!fetchResult) return res.json({ message: "URL错误", success: false });
  const saveResult = await saveOrderData(
    fetchResult,
    openId,
    marketPrice
  ).catch(() => {
    res.json({ success: false, message: "上传失败！" });
  });
  res.json(saveResult);
};

// 根据groupOrderId这个接口方便我上传新的拼单
export const createNewGroupByOrderId = async (req: Request, res: Response) => {
  let { groupOrderId, openId, marketPrice = 0 } = req.body;
  if (!groupOrderId) {
    return res.json({ message: "groupOrderId不存在", success: false });
  }

  const isExist = await Order.findOne({ groupOrderId }).exec();
  if (isExist)
    return res.json({ message: "groupOrderId已存在", success: false });
  const fetchResult = await getOrderData(groupOrderId);
  if (!fetchResult) return res.json({ message: "URL错误", success: false });
  const saveResult = await saveOrderData(
    fetchResult,
    openId,
    marketPrice
  ).catch(() => {
    res.json({ success: false, message: "上传失败！" });
  });
  res.json(saveResult);
};

// 目前没有做鉴权，危险操作，注释掉
export const deleteGroup = async (req: Request, res: Response) => {
  return res.json({ success: false, message: "暂时不支持删除" });
  // const { groupOrderId } = req.body;
  // if (!groupOrderId)
  //   return res.json({ message: "groupOrderId不存在", success: false });

  // const result = await Order.deleteOne({ groupOrderId }).exec();
  // res.json({
  //   success: true,
  //   data: result,
  // });
};

export const getOrderById = async (req: Request, res: Response) => {
  const { groupOrderId } = req.query;
  if (!groupOrderId) {
    res.json({ success: false, message: "groupOrderId不存在" });
    return;
  }

  const order = await Order.findOne({ groupOrderId }).exec();
  if (!order) {
    res.json({ success: false, message: "该拼单不存在" });
    return;
  }
  res.json({ success: true, data: order });
};
