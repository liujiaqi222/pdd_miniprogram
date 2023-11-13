import type { Types } from "mongoose";
import { ExpiredOrder, Order } from "../models/order.js";
import { getOrderData } from "../util/index.js";
import { timeOut } from "../util/index.js";

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
export const moveExpiredOrders = async () => {
  const expiredOrders = await Order.find({
    expireTime: { $lt: Date.now() },
  }).catch((err) => console.log("查询过期订单报错", err));
  expiredOrders?.forEach((doc) => {
    if (doc.user) {
      ExpiredOrder.create(doc.toObject()).catch((err) => {
        console.log(err, "存储过期订单报错");
      });
    }
    deleteOrderById(doc._id);
  });
};

export const traverseOrders = async () => {
  const orders = await Order.find({ expireTime: { $gt: Date.now() } });
  for (const order of orders) {
    const { groupOrderId, _id } = order;
    await timeOut(Math.random() * 1200);
    getOrderData(groupOrderId!).then((res) => {
      if (!res || !res.groupInfo) {
        return;
      }
      const { groupStatus, groupRemainCount, groupUserList } = res.groupInfo;
      if (groupStatus !== 0 || !groupRemainCount) {
        // 等于1代表拼单成功，等于2拼单失败，但只要不是0，就代表拼单结束，pdd会将groupRemainCount设置为undefined
        if (!order.user) {
          console.log(_id, "订单已经拼满或过期，删除该订单");
          deleteOrderById(order._id);
          return;
        }
        order.groupRemainCount = groupStatus === 1 ? 0 : order.groupRemainCount;
        order.groupUserList = groupUserList;
        order.groupStatus = groupStatus;
        console.log(_id, "订单已经拼满或过期，移动到过期订单集合中");
        ExpiredOrder.create(order.toObject()).catch((err) => {
          console.log("移动到过期订单集合失败", err);
        });
        return;
      }
      if (order.groupRemainCount !== groupRemainCount) {
        order.groupRemainCount = groupRemainCount;
        order.groupUserList = groupUserList;
        order.save().catch((err) => {
          console.log(err, "更新失败");
        });
      }
    });
  }
};

const deleteOrderById = (id: Types.ObjectId) => {
  Order.findByIdAndDelete(id).catch((err) => {
    console.log(err);
  });
};

