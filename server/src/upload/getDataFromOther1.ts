import { timeOut } from "../util/index.js";

const url =
  "https://pdd.mkstone.club/index.php/pdd/index/get_group?current_page=";

const options = {
  method: "GET",
  headers: {
    Referer: "https://servicewechat.com/wx9b0c8c20dade98ea/12/page-frame.html",
    authorization: "ov7Pv5FLeiMVRP3YGollHGhBruOw",
  },
};
export const uploadOrderData1 = async () => {
  let page = 1;
  while (true) {
    try {
      const res = await fetch(url + page, options);
      const json = await res.json();
      page++;
      const { data } = json as { data: { url: string }[] };
      if (!data.length) {
        break; // 跳出while循环
      }
      for (const { url } of data) {
        if (!url) continue;
        await timeOut(Math.random() * 2000);
        const res = await fetch("http://localhost:4000/api/v1/orders/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
          }),
        });
        const json = await res.json();
        console.log(json);
      }
    } catch (err) {
      console.error("error:" + err);
    }
  }
};
