import type { Types } from "mongoose";
import { Order } from "../models/order.js";
import { getOrderData } from "../util/index.js";

/*
  - 根据expireTime，可以无脑使用管道聚合删除然后移动订单到存放过期的集合中，可以5min定时运行一次
  - 如果订单信息不全，则直接删除 定时任务可以设置成1天执行一次
  - 逐个请求当前订单是否拼满，如果拼满则移动到存放到过期的集合中，定时10min进行一次。
 */

// 删除拼单信息不完整的订单
export const deleteIncompleteOrders = () => {
  Order.deleteMany({
    $or: [
      { goodsName: { $in: ["", null] } },
      { customerNum: { $in: ["", null] } },
      { hdThumbUrl: { $in: ["", null] } },
    ],
  }).catch((err) => {
    console.log("删除不完整的订单报错", err);
  });
};

// 处理已经过期的订单
// 需要优化：管道聚合移动到过期订单集合中的同时删除orders中的订单
export const moveExpiredOrders = async () => {
  await Order.aggregate([
    { $match: { expireTime: { $lt: new Date() } } },
    { $project: { _id: 0 } },
    {
      $merge: {
        into: "expiredOrders",
        on: "groupOrderId",
        whenMatched: "replace",
        whenNotMatched: "insert",
      },
    },
  ]).catch((err) => console.log("移动过期订单报错", err));

  const expiredOrders = await Order.find({
    expireTime: { $lt: Date.now() },
  }).catch((err) => console.log("查询过期订单报错", err));
  console.log(expiredOrders);
  expiredOrders?.forEach((doc) => {
    console.log("从orders中删除过期订单", doc._id);
    deleteOrderById(doc._id);
  });
};

export const traverseOrders = async () => {
  const orders = await Order.find({ expireTime: { $gt: Date.now() } });

  for (const order of orders) {
    const { groupOrderId, _id } = order;
    getOrderData(groupOrderId!).then((res) => {
      if (!res || !res.groupInfo) {
        return deleteOrderById(_id);
      }
      const { groupStatus, groupRemainCount } = res.groupInfo;
      if (groupStatus !== 0 || !groupRemainCount ) {
        console.log(_id, "订单已经拼满，移动到过期订单集合中")
        return moveOrderById(_id);
      }
      if (order.groupRemainCount !== groupRemainCount) {
        order.groupRemainCount = groupRemainCount;
        order.save().catch((err) => {
          console.log(err, "更新失败");
        });
      }
    });
  }
};

const moveOrderById = async (id: Types.ObjectId) => {
  await Order.aggregate([
    { $match: { _id: id } },
    { $project: { _id: 0 } },
    {
      $merge: {
        into: "expiredOrders",
        on: "groupOrderId",
        whenMatched: "replace",
        whenNotMatched: "insert",
      },
    },
  ]).catch((err) => console.log("移动过期订单报错", err));
  deleteOrderById(id);
};

const deleteOrderById = (id: Types.ObjectId) => {
  Order.findByIdAndDelete(id).catch((err) => {
    console.log(err);
  });
};
