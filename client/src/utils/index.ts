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
  if (!date) return "";
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};

/**@description 登录  */
export const loginUser = async () => {
  const { code } = await login();
  const { data } = await getOpenId(code);
  setStorageSync("openId", data.openId);
  setStorageSync("loginTime", Date.now());
};

/**@description 检查登录状态  */
export const checkLogin = async () => {
  const loginTime = getStorageSync("loginTime");
  const openId = getStorageSync("openId");
  // 如果没有openId,则登录
  if (!openId) {
    return loginUser();
  }
  // 如果openId,则判断是否超过一天，超过一天则检查登录状态
  if (Date.now() - loginTime > 24 * 60 * 60 * 1000) {
    try {
      const res = await checkSession().catch((err) => console.log(err));
      if (!res) return loginUser();
      setStorageSync("loginTime", Date.now());
    } catch (err) {
      return loginUser();
    }
  }
};

export const createSign = (
  params: Record<string, string | number | boolean>
): string => {
  const str = `${process.env.CLIENT_SECRET}${Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("")}${process.env.CLIENT_SECRET}`;

  return md5(str).toUpperCase();
};

export const pddRequest = (
  params: Record<string, string | number | boolean> & { type: string }
): RequestTask<any> => {
  Object.assign(params, {
    client_id: process.env.CLIENT_ID,
    timestamp: Math.floor(Date.now() / 1000),
  });
  const sign = createSign(params);
  return request({
    url: "https://gw-api.pinduoduo.com/api/router",
    method: "POST",
    data: {
      ...params,
      sign,
    },
  });
};

export const createSignObject = <T extends Record<string, any>>(
  origin: T
): T & { timestamp: number; sign: string } => {
  const sign = createSign(origin);
  return {
    timestamp: Date.now(),
    sign,
    ...origin,
  };
};

export const encodeCustomParams = (openId: string) => {
  return encodeURIComponent(
    `&customParameters=${encodeURIComponent(`{"uid":"1","openId":"${openId}"}`)}`
  );
};
