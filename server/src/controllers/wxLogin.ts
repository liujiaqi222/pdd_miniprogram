import { Request, Response } from "express";

export const wxLogin = async (req: Request, res: Response) => {
  const { code } = req.query as { code: string };
  if (!code) {
    res.status(400).json({ message: "code is required" });
  }
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.APPID}&secret=${process.env.WX_SECRET}&js_code=${code}&grant_type=authorization_code`;
  const result = await fetch(url);
  const data = await result.json();
  console.log(data);
  res.status(200).json(data);
};
