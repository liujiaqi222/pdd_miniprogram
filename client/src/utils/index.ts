import md5 from "md5";
import {
  request,
  RequestTask,
  checkSession,
  setStorageSync,
  getStorageSync,
  login,
} from "@tarojs/taro";
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
export const loginUser = async () => {
  const { code } = await login();
  const { data } = await getOpenId(code);
  const { openid, session_key } = data;
  setStorageSync("openId", openid);
  setStorageSync("sessionKey", session_key);
  setStorageSync("loginTime", Date.now());
};

/**@description 检查登录状态  */
export const checkLogin = async () => {
  const loginTime = getStorageSync("loginTime");
  const sessionKey = getStorageSync("sessionKey");
  const openId = getStorageSync("openId");
  // 如果没有sessionKey或者openId,则登录
  if (!sessionKey || !openId) {
    return loginUser();
  }
  // 如果有sessionKey和openId,则判断是否超过一天，超过一天则检查登录状态
  if (Date.now() - loginTime > 24 * 60 * 60 * 1000) {
    try {
      const res = await checkSession().catch();
      if (!res) return loginUser();
    } catch (err) {
      console.log(err);
      return loginUser();
    }
  }
};

export const createSign = (params: Record<string, string | number|boolean>) => {
  const str = `${process.env.CLIENT_SECRET}${Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("")}${process.env.CLIENT_SECRET}`;

  console.log(str);
  return md5(str).toUpperCase();
};

export const pddRequest = (
  params: Record<string, string | number|boolean> & { type: string }
): RequestTask<any> => {
  Object.assign(params, {
    client_id: process.env.CLIENT_ID,
    timestamp: Math.floor(Date.now() / 1000),
  });
  const sign = createSign(params);
  console.log(sign);
  return request({
    url: "http://gw-api.pinduoduo.com/api/router",
    method: "POST",
    data: {
      ...params,
      sign,
    },
  });
};
