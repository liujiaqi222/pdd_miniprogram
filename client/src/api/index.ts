import {
  request,
  addInterceptor,
  interceptors,
  RequestTask,
} from "@tarojs/taro";
import { OrderData, OrderParams } from "./types";

addInterceptor(interceptors.timeoutInterceptor);

const urlPrefix = "http://xiaobaijun.top/api/v1";
// 获取拼单列表
export const getOrders = (
  query?: OrderParams,
  currentPage?: number
): RequestTask<OrderData[]> => {
  return request({
    url: `${process.env.URL_PREFIX}/orders/`,
    method: "GET",
    data: {
      goodsName: query?.searchKey || "",
      currentPage: currentPage || 0,
      listType: query?.listType,
    },
  });
};

// 创建新拼单
export const createNewGroup = (url: string, openId: string) => {
  return request({
    url: `${urlPrefix}/orders/`,
    method: "POST",
    data: {
      url,
      openId,
    },
  });
};

// 获取用户ID
export const getOpenId = (
  code: string
): RequestTask<{ openid: string; session_key: string }> => {
  return request({
    url: `${urlPrefix}/user/login`,
    method: "GET",
    data: {
      code,
    },
  });
};

// 获取用户名下的拼单
export const getMyOrders = (
  openId: string
): RequestTask<{ success: boolean; message: string; data: OrderData[] }> => {
  return request({
    url: `${urlPrefix}/user/orders/${openId}`,
    method: "GET",
  });
};
