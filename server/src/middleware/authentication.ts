import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticationMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.WX_SECRET!);
    req.body.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
