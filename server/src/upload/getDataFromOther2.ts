import { timeOut } from "../util/index.js";

const url =
  "https://pdd2.xingkeshidai.cn/api/applet/homepage/group_list?page=1&group_remain_count=0&goods_name_search=&limit=1000";

export const uploadOrderData2 = async () => {
  const orders = await fetch(url).catch();
  if (!orders) return;
  const { result_msg, result_object } = await orders.json().catch();
  if (result_msg !== "Success!") return;
  const { data } = result_object;
  for (const { id } of data) {
    await timeOut(Math.random() * 2000);
    const res = await fetch(
      "https://pdd2.xingkeshidai.cn/api/applet/homepage/place_an_order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    ).catch((err) => {
      console.log(err, "fetch", id);
    });

    if (!res) return;
    const json = await res.json().catch((err) => {
      console.log(err, id, "json");
    });
    if (!json || json.result_msg !== "Success!") return;
    const uploadResult = await fetch(
      "http://localhost:4000/api/v1/orders/byId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl: json.result_object.group_url,
        }),
      }
    ).catch((err) => console.log(err, json.result_object.group_url));
    if (!uploadResult) return;
    const uploadJSON = await uploadResult.json().catch((err) => {
      console.log(err, "uploadJSON", json.result_object.group_url);
    });
    console.log(uploadJSON);
  }
};

