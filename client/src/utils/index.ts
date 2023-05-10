import Taro from "@tarojs/taro";
import { getOpenId } from "../api";

// 小程序不支持toLocaleString
// 转换日期为 年/月/日 时:分:秒
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};

/**@description 登录  */
export const login = async () => {
  const { code } = await Taro.login();
  const { data } = await getOpenId(code);
  const { openid, session_key } = data;
  Taro.setStorageSync("openId", openid);
  Taro.setStorageSync("sessionKey", session_key);
  Taro.setStorageSync("loginTime", Date.now());
};

/**@description 检查登录状态  */
export const checkLogin = async () => {
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
