import { Request, Response } from "express";
import { Config } from "../models/config.js";

export const changeGroupUrl = async (req: Request, res: Response) => {
  const { groupUrl } = req.body;
  if (!groupUrl) return res.status(400).json({ message: "groupUrl不能为空" });
  // 更新数据库中的groupUrl字段
  await Config.findOneAndUpdate({}, { groupUrl }, { upsert: true });
  res.json({ message: "更新成功", success: true });
};

export const getGroupeUrl = async (req: Request, res: Response) => {
  const config = await Config.findOne({});
  res.json({ message: "获取成功", success: true, groupUrl: config?.groupUrl });
};
