import { timeOut } from "../util/index.js";

export const uploadOrderData3 = async () => {
  let page = 0;
  while (true) {
    try {
      const res = await fetch(
        `${process.env.URL_PREFIX_OTHER3}/goods?page=${page}&session=0d89b0078701cd54cc0de98d2e0b9b62798f199aebdce7010c3772d9aa68e4be`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Version": "1.6",
          },
        }
      );
      const goodsList = await res.json();

      if (!Array.isArray(goodsList) || !goodsList.length) {
        console.log("not response");
        break; // 跳出while循环
      }
      for (let goods of goodsList) {
        const { group_total, goods_id } = goods;

        if (Number(group_total) === 0) continue;
        const res = await fetch(
          `${process.env.URL_PREFIX_OTHER3}/groups?goods_id=${goods_id}&session=0d89b0078701cd54cc0de98d2e0b9b62798f199aebdce7010c3772d9aa68e4be`,
          {
            method: "GET",
            headers: {
              "X-Version": "1.6",
            },
          }
        );
        const groups = await res.json();
        if (!Array.isArray(groups) || !groups.length) continue;
        await timeOut(Math.random() * 3000);
        const uploadResult = await fetch(
          "http://localhost:4000/api/v1/orders/byId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              groupOrderId: groups[0].group_id  // 只取第一个
            }),
          }
        );
        const uploadJSON = await uploadResult.json();
        console.log(uploadJSON);
      }
      page++;
    } catch (err) {
      console.log(err);
    }
  }
};
