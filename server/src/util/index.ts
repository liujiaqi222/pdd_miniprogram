import https from "https";
import http from "http";
import type { ReverseResult, PddData } from "../types/index.js";
import nodeFetch from "node-fetch";

export function reverseShortUrl(url: string): ReverseResult {
  let urlObj: URL;
  try {
    urlObj = new URL(url);
  } catch (e) {
    return Promise.resolve({
      success: false,
      error: "Invalid URL",
    });
  }

  if (!urlObj.protocol.match(/https?:/))
    return Promise.resolve({
      success: false,
      error: "Invalid URL protocol",
    });

  let protocol = urlObj.protocol === "https:" ? https : http;
  return new Promise((resolve) => {
    protocol
      .get(url, (res) => {
        const { location } = res.headers;
        if (location) {
          return resolve({
            longUrl: location,
            headers: res.headers,
            success: true,
          });
        }
        resolve({
          success: false,
          error: "No location header",
          headers: res.headers,
        });
      })
      .on("error", (error) => {
        resolve({ success: false, error });
      });
  });
}

export const isValidUrl = (url: string) => {
  if (!url) return { isValid: false, orderId: "" };
  const reg = /^(http|https):\/\/([\w.]+\/?)\S*/;
  if (!reg.test(url)) return { isValid: false, orderId: "" };
  const urlObj = new URL(url);
  const { hostname, searchParams } = urlObj;
  if (hostname !== "mobile.yangkeduo.com")
    return { isValid: false, orderId: "" };
  if (!searchParams.has("group_order_id"))
    return { isValid: false, orderId: "" };
  const orderId: string = searchParams.get("group_order_id")!;
  if (orderId.length < 10) return { isValid: false, orderId: "" };
  return { isValid: true, orderId };
};

const PDD_URL =
  "https://mobile.yangkeduo.com/pincard_ask.html?__rp_name=brand_amazing_price_group&_pdd_tc=ffffff&_pdd_sbs=1&group_order_id=";
export const getOrderData = async (orderId: string): Promise<PddData["store"]|false> => {
  // 如果fetch不存在，使用node-fetch
  const fetch = globalThis.fetch || nodeFetch;
  const url = (process.env.PDD_URL || PDD_URL) + orderId;
  const response = await fetch(url, {
    headers: {
      "accept-encoding": "gzip, deflate, br",
      cookie: process.env.COOKIE!,
    },
  }).catch((err) => {
    console.log(err);
  });
  if (!response) return false;
  const data = await response.text();
  const matchedResult = data.match(/(?<=window.rawData=).+(?=;<\/script>)/);

  if (!matchedResult || !matchedResult[0].length) return false;
  const pddData: PddData = JSON.parse(matchedResult[0]);

  return pddData?.store;
};



export const timeOut = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
};
