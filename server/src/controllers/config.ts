import { Request, Response } from "express";
import { Config } from "../models/config.js";

export const changeConfig = async (req: Request, res: Response) => {
  const { type, data } = req.body;
  if (!type || data == null)
    return res
      .status(400)
      .json({ message: "type和data不能为空", success: false, data: "" });
  // 更新数据库中的groupUrl字段
  await Config.findOneAndUpdate(
    {},
    { $set: { [type]: data } },
    { upsert: true }
  );
  res.json({ message: "更新成功", success: true, data: "" });
};

export const getConfig = async (req: Request, res: Response) => {
  const config = await Config.findOne({});
  res.json({ message: "获取成功", success: true, data: config });
};
