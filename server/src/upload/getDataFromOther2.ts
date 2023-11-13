import { Order } from "../models/order.js";
import { timeOut } from "../util/index.js";

export const uploadOrderData2 = async () => {
  const orders = await fetch(
    `${process.env.URL_PREFIX_OTHER2}/group_list?page=1&group_remain_count=0&goods_name_search=&limit=1000`
  ).catch();
  if (!orders) return;
  const { result_msg, result_object } = await orders.json().catch();
  if (result_msg !== "Success!") return;
  const { data } = result_object;
  for (const { id, goods_name } of data) {
    if (goods_name) {
      const res = await Order.findOne({ goodsName: goods_name }).exec();
      if (res) continue;
    }
    await timeOut(Math.random() * 3000);
    const res = await fetch(`${process.env.URL_PREFIX_OTHER2}/place_an_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).catch((err) => {
      console.log(err, "fetch", id);
    });

    if (!res) return;
    const json = await res.json().catch((err) => {
      console.log(err, id, "json");
    });
    if (!json || json.result_msg !== "Success!") return;
    const uploadResult = await fetch("http://localhost:4000/api/v1/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: json.result_object.group_url,
      }),
    }).catch((err) => console.log(err));
    if (!uploadResult) return;
    const uploadJSON = await uploadResult.json().catch((err) => {
      console.log(err, "uploadJSON");
    });
    console.log(uploadJSON);
  }
};
