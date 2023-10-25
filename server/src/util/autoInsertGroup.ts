import { pddFetch } from "./pddFetch.js";

/**
 * @description 拼多多百亿多人团定时插入
 *  order_status =0 已经支付
 */
type Order = {
  order_list_get_response: {
    total_count: number;
    order_list: {
      group_id: number;
      order_sn: string;
      type: number;
      goods_name: string;
      order_status: number;
      activity_tags: number[];
      custom_parameters: string;
    }[];
  };
};
export const autoInsertGroup = async () => {
  const result: Order = await pddFetch({
    type: "pdd.ddk.order.list.increment.get",
    start_update_time: Math.trunc((Date.now() - 1000 * 120) / 1000), //  120s前的订单
    end_update_time: Math.trunc(Date.now() / 1000),
  });

  const res = result.order_list_get_response;
  console.log(res);
  if (res.total_count === 0) return;

  for (let {
    order_sn,
    order_status,
    activity_tags,
    custom_parameters,
    group_id,
  } of res.order_list) {
    let openId = "";
    if (custom_parameters) {
      try {
        openId = JSON.parse(custom_parameters).openId;
      } catch (err) {
        console.log("解析json错误", err);
      }
    }
    if (order_status !== 0 || (!activity_tags.includes(12955) && !openId))
      continue;

    const sn = order_sn.split("-")[1];
    const groupOrderId = `${group_id.toString().slice(0, 4)}${sn}`;

    const uploadResult = await fetch(
      "http://localhost:4000/api/v1/orders/byId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupOrderId,
          openId,
        }),
      }
    );
    const uploadJSON = await uploadResult.json();
    console.log(order_sn, groupOrderId, uploadJSON);
  }
};
