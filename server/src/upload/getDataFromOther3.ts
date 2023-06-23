import { timeOut } from "../util/index.js";

export const uploadOrderData3 = async () => {
  const formData = new FormData();
  formData.append("start", "0");
  formData.append("pagesize", "500");
  console.log(process.env.URL_PREFIX_OTHER3);
  const result = await fetch(process.env.URL_PREFIX_OTHER3!, {
    method: "POST",
    body: formData,
  });
  const { list } = await result.json();
  for (const { group_order_id } of list) {
    console.log(group_order_id);
    await timeOut(Math.random() * 3000);
    const uploadResult = await fetch(
      "http://localhost:4000/api/v1/orders/byId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupOrderId: group_order_id,
        }),
      }
    );
    const uploadJSON = await uploadResult.json();
    console.log(uploadJSON);
  }
};
