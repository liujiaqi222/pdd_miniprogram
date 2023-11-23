import { Request, Response } from "express";
import { Config } from "../models/config.js";

export const changeConfig = async (req: Request, res: Response) => {
  const { type, data, appType } = req.body;
  if (!type || data == null)
    return res
      .status(400)
      .json({ message: "type和data不能为空", success: false, data: "" });
  if (appType === "all") {
    // 更新数据库中所有document的指定type字段
    await Config.updateMany({}, { $set: { [type]: data } });
  } else {
    // 更新数据库中的指定type字段
    await Config.findOneAndUpdate(
      { appType: appType || "default" },
      { $set: { [type]: data } },
    );
  }
  res.json({ message: "更新成功", success: true, data: "" });
};

export const getConfig = async (req: Request, res: Response) => {
  const { appType } = req.query;
  const config = await Config.findOne({ appType: appType || "default" });
  res.json({ message: "获取成功", success: true, data: config });
};
