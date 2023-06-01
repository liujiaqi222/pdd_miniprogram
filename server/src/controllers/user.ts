import { Request, Response } from "express";
import { Order, ExpiredOrder } from "../models/order.js";
import { User } from "../models/user.js";

export const wxLogin = async (req: Request, res: Response) => {
  const { code } = req.query as { code: string };
  if (!code) {
    res.status(400).json({ message: "code is required" });
  }
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.APPID}&secret=${process.env.WX_SECRET}&js_code=${code}&grant_type=authorization_code`;
  const result = await fetch(url);
  const data = await result.json();
  const { openid, session_key } = data;
  if (!openid || !session_key) return res.status(400).json(data);
  res.status(200).json(data);
  // 根据openid用户是否存在，不存在则创建用户
  User.findOneAndUpdate(
    { openId: openid },

    {
      $set: {
        sessionKey: session_key,
        code: code,
      },
      $setOnInsert: {
        openId: openid,
        sessionKey: session_key,
        code: code,
      },
    },
    { upsert: true }
  )
    .exec()
    .catch((err) => {
      console.log(err);
    });
};

export const getUserOrders = async (req: Request, res: Response) => {
  const openId = req.query.openId;
  if (!openId) {
    return res.json({ message: "未提供openId", data: [], success: false });
  }
  const user = await User.findOne({ openId: openId }).exec();
  if (!user)
    return res.json({ message: "用户不存在", data: [], success: false });
  // 需要优化，目前是全量查询
  const currentOrders = await Order.find({ user: user._id }).sort({
    createdAt: -1,
  });
  const expiredOrders = await ExpiredOrder.find({ user: user._id }).sort({
    createdAt: -1,
  });
  res.json({
    message: "查询成功",
    data: [...currentOrders, ...expiredOrders],
    success: true,
  });
};
