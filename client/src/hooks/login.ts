import Taro from "@tarojs/taro";
import { useState } from "react";
import { getOpenId } from "../api";

/**@description 登录  */
const login = async () => {
  const { code } = await Taro.login();
  const { data } = await getOpenId(code);
  const { openid, session_key } = data;
  Taro.setStorageSync("openId", openid);
  Taro.setStorageSync("sessionKey", session_key);
  Taro.setStorageSync("loginTime", Date.now());
};

/**@description 检查登录状态  */
const checkLogin = async () => {
  const loginTime = Taro.getStorageSync("loginTime");
  const sessionKey = Taro.getStorageSync("sessionKey");
  const openId = Taro.getStorageSync("openId");
  // 如果没有sessionKey或者openId,则登录
  if (!sessionKey || !openId) {
    return login();
  }
  // 如果有sessionKey和openId,则判断是否超过一天，超过一天则检查登录状态
  if (Date.now() - loginTime > 24 * 60 * 60 * 1000) {
    const res = await Taro.checkSession().catch();
    // 如果sessionKey过期，wx会报错，catch后，此时res为空
    if (!res) return login();
  }
  console.log("登录有效！");
};

export const useUserLogin = () => {
  const [openId, setOpenId] = useState("");
  checkLogin().then(() => {
    setOpenId(Taro.getStorageSync("openId"));
    Taro.setStorageSync("loginTime", Date.now());
  });

  return { openId };
};
