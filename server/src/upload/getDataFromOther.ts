import fetch from "node-fetch";
const url =
  "https://pdd.mkstone.club/index.php/pdd/index/get_group?current_page=";

const options = {
  method: "GET",
  headers: {
    Referer: "https://servicewechat.com/wx9b0c8c20dade98ea/12/page-frame.html",
    authorization: "ov7Pv5FLeiMVRP3YGollHGhBruOw",
  },
};
// 没错从别人的小程序里爬数据
const getOrderData = async () => {
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
      for await (const { url } of data) {
        if (!url) continue;

        const res = await fetch("http://localhost:4000/api/v1/orders/byId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longUrl: url,
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

getOrderData();
