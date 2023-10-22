import { pddFetch } from "./pddFetch.js";

/**
 * @description 拼多多百亿多人团定时插入
 *  type一定是61, 61是百亿补贴
 *  order_status =0 已经支付
 */
type Order = {
  order_list_get_response: {
    total_count: number;
    order_list: {
      group_id: string;
      order_sn: string;
      type: number;
      goods_name:string
      order_status: number;
    }[];
  };
};
export const autoInsertGroup = async () => {
  const result: Order = await pddFetch({
    type: "pdd.ddk.order.list.increment.get",
    start_update_time: Math.trunc((Date.now() - 1000 * 70) / 1000), //  70s前的订单
    end_update_time: Math.trunc(Date.now() / 1000),
  });

  const res = result.order_list_get_response;
  console.log(res)
  if (res.total_count === 0) return;

  for (let { order_sn, order_status, type, goods_name } of res.order_list) {
    if (order_status !== 0 || type !== 61) continue;
    const sn = order_sn.split("-")[1];
    const uploadResult = await fetch(
      "http://localhost:4000/api/v1/orders/byId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupOrderId: `2380${sn}`,
        }),
      }
    );
    const uploadJSON = await uploadResult.json();
    console.log(order_sn, order_status, type, goods_name,uploadJSON);
  }
};
