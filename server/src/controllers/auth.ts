import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.js";

export const register = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(400).json({ message: "name and password are required" });
  const admin = await Admin.create({ name, password });
  res.status(201).json({
    data: {
      user: { name: admin.name, role: admin.role },
      token: jwt.sign(
        { id: admin._id, name: admin.name },
        process.env.WX_SECRET!,
        {
          expiresIn: "1d", // 1天过期
        }
      ),
    },
    message: "登录成功",
    success: true,
  });
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res.json({
      message: "用户名和密码不能为空",
      success: false,
    });
  const admin = await Admin.findOne({ name });
  if (!admin)
    return res.json({ message: "用户名或者密码错误", success: false });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch)
    return res.json({ message: "用户名或者密码错误", success: false });
  res.json({
    data: {
      user: { name: admin.name, role: admin.role },
      token: jwt.sign(
        { id: admin._id, name: admin.name },
        process.env.WX_SECRET!,
        {
          expiresIn: "1d", // 1天过期
        }
      ),
    },
    success: true,
    message: "登录成功",
  });
};
