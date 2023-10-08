/*
  - 根据expireTime，使用管道聚合删除然后移动订单到存放过期的集合中，可以5min定时运行一次
  - 如果订单信息不全，则直接删除 定时任务可以设置成1天执行一次
  - 逐个请求当前订单是否拼满，如果拼满则移动到存放到过期的集合中，定时10min进行一次。
  - 获取拼单信息，定时任务可以设置成30min执行一次
 */
import nodeSchedule from "node-schedule";
import {
  moveExpiredOrders,
  traverseOrders,
  deleteIncompleteOrders,
} from "./../db/traverseOrders.js";
// import { uploadOrderData1 } from "../upload/getDataFromOther1.js";
// import { uploadOrderData2 } from "../upload/getDataFromOther2.js";
// import { uploadOrderData3 } from "../upload/getDataFromOther3.js";
// import { Order } from "../models/order.js";

// 每1min执行一次
nodeSchedule.scheduleJob("*/1 * * * *", () => {
  console.log("定时任务：移动过期订单");
  moveExpiredOrders();
});

// 每1min执行一次
nodeSchedule.scheduleJob("*/1 * * * *", () => {
  console.log("定时任务：更新订单信息");
  traverseOrders();
});

// // 每30min执行一次
// nodeSchedule.scheduleJob("*/30 * * * *", () => {
//   // 如果此时拼单总数已经超过了520，则不再获取，也没那么多用户，没有必要继续获取
//   Order.countDocuments().then((count) => {
//     console.log(
//       `拼单数为${count}，${count >= 520 ? "不再获取" : "继续获取"}新的拼单信息`
//     );
//     if (count >= 520) return;
//     uploadOrderData1();
//     uploadOrderData2();
//     uploadOrderData3();
//   });
// });

// 每天执行一次
nodeSchedule.scheduleJob("0 0 * * *", () => {
  console.log("定时任务：删除不完整的订单");
  deleteIncompleteOrders();
});
