import {
  request,
  addInterceptor,
  interceptors,
  RequestTask,
} from "@tarojs/taro";
import { OrderData, OrderParams } from "./types";

addInterceptor(interceptors.timeoutInterceptor);

const urlPrefix = "http://localhost:4000/api/v1";

// 获取拼单列表
export const getOrders = (
  query?: OrderParams,
  currentPage?: number
): RequestTask<OrderData[]> => {
  return request({
    url: `${urlPrefix}/orders/`,
    method: "GET",
    data: {
      goodsName: query?.searchKey || "",
      currentPage: currentPage || 0,
      listType: query?.listType,
    },
  });
};

// 创建新拼单
export const createNewGroup = (url: string) => {
  return request({
    url: ` ${urlPrefix}/orders/`,
    method: "POST",
    data: {
      url,
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


