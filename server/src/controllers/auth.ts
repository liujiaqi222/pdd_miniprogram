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
    user: { name: admin.name, role: admin.role },
    token: jwt.sign(
      { id: admin._id, name: admin.name },
      process.env.WX_SECRET!,
      {
        expiresIn: "1d", // 1天过期
      }
    ),
    success: true,
  });
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(400).json({ message: "name and password are required" });
  const admin = await Admin.findOne({ name });
  if (!admin)
    return res
      .status(400)
      .json({ message: "user does not exist or invalid password" });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch)
    return res
      .status(400)
      .json({ message: "user does not exist or invalid password" });
  res.json({
    user: { name: admin.name, role: admin.role },
    token: jwt.sign(
      { id: admin._id, name: admin.name },
      process.env.WX_SECRET!,
      {
        expiresIn: "1d", // 1天过期
      }
    ),
  });
};
