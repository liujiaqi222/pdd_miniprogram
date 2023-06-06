import { User } from "../models/user.js";

export const setUser = (openId: string, code?: string) => {
  User.findOneAndUpdate(
    { openId: openId },
    {
      $set: {
        // code 存在的情况下 才进行set，否则啥也不做
        ...(code ? { code } : {}),
      },
      $setOnInsert: {
        openId,
      },
    },
    { upsert: true }
  )
    .exec()
    .catch((err) => {
      console.log(err);
    });
};
