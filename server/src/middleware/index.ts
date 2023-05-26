import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

/**
 *  @description 验证sign，防止恶意请求
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 创建拼单这些接口不需要验证
  if (
    (req.path.includes("/api/v1/orders/byId") ||
      req.path.includes("/api/v1/orders")) &&
    req.method === "POST"
  ) {
    next();
    return;
  }
  const { sign, timestamp, ...params } =
    req.method === "GET" ? req.query : req.body;
  if (!sign) {
    res.json({ success: false, message: "缺少sign" });
    return;
  }
  if (!timestamp || Date.now() - Number(timestamp) > 1000 * 60 * 3) {
    res.json({ success: false, message: "timestamp超时" });
    return;
  }
  const str = `${process.env.CLIENT_SECRET}${Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("")}${process.env.CLIENT_SECRET}`;
  const md5 = crypto.createHash("md5");
  const newSign = md5.update(str).digest("hex").toUpperCase();
  if (sign === newSign) {
    next();
  } else {
    res.json({ success: false, message: "sign错误" });
  }
};
