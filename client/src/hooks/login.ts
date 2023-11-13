import { getStorageSync, } from "@tarojs/taro";
import { useState } from "react";
import { checkLogin } from "../utils";


export const useUserLogin = () => {
  const [openId, setOpenId] = useState("");
  checkLogin().then(() => {
    setOpenId(getStorageSync("openId"));
  });

  return { openId };
};

