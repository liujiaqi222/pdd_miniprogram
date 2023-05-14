import { Request, Response } from "express";
import { pddFetch } from "../util/pddFetch.js";

export const fetchPdd = async (req: Request, res: Response) => {
  const { type, ...params } = req.body;
  if (!type) return res.json({ error: "type is required" });
  const result = await pddFetch({ type, ...params }).catch(err=>{
    console.log(err)
  });
  res.json(result);
};
