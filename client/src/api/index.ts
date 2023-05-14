import {
  request,
  addInterceptor,
  interceptors,
  RequestTask,
} from "@tarojs/taro";
import { pddRequest } from "../utils/index";
import type { CouponGoodsData, OrderData, OrderParams } from "./types";

addInterceptor(interceptors.timeoutInterceptor);

const urlPrefix = process.env.URL_PREFIX;
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
  console.log(urlPrefix);
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
console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

/**
 * @description 获取拼多多优惠商品信息
 * @see https://jinbao.pinduoduo.com/third-party/api-detail?apiName=pdd.ddk.goods.recommend.get
 * @param {number} offset - 从多少位置开始请求；默认值 ： 0 // 必须是limit的整数倍，limit默认是20
 */
export const getCouponGoods = (
  { offset, limit } = { offset: 0, limit: 20 }
): RequestTask<CouponGoodsData> => {
  return pddRequest({ type: "pdd.ddk.goods.recommend.get", offset, limit });
};
