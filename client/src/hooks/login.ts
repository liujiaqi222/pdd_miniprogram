import Taro from "@tarojs/taro";
import { useState } from "react";
import { checkLogin } from "../utils";


export const useUserLogin = () => {
  const [openId, setOpenId] = useState("");
  checkLogin().then(() => {
    setOpenId(Taro.getStorageSync("openId"));
    Taro.setStorageSync("loginTime", Date.now());
  });

  return { openId };
};
