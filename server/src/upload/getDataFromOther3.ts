import { timeOut } from "../util/index.js";

export const uploadOrderData3 = async () => {
  let page = 0;
  while (true) {
    try {
      const res = await fetch(
        `${process.env.URL_PREFIX_OTHER3}/goods?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Version": "1.6",
          },
        }
      );
      const goodsList = await res.json();
      if (!goodsList.length) {
        break; // 跳出while循环
      }
      for (let goods of goodsList) {
        const { group_total, goods_id } = goods;
        if (Number(group_total) === 0) continue;
        const res = await fetch(
          `${process.env.URL_PREFIX_OTHER3}/groups?goods_id=${goods_id}`,
          {
            method: "GET",
            headers: {
              "X-Version": "1.6",
            },
          }
        );
        const groups = await res.json();
        for (let group of groups) {
          const { group_id } = group;
          await timeOut(Math.random() * 3000);
          const uploadResult = await fetch(
            "http://localhost:4000/api/v1/orders/byId",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                groupOrderId: group_id,
              }),
            }
          );
          const uploadJSON = await uploadResult.json();
          console.log(uploadJSON);
        }
      }
      page++;
    } catch (err) {}
  }
};
