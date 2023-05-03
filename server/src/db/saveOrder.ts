import { PddData } from "../types/index.js";
import { Order } from "../models/order.js";
import { User } from "../models/user.js";

export const saveOrderData = async (
  pddData: PddData["store"],
  openId?: string
) => {
  const { goodsInfo, groupInfo, endTimeMs } = pddData || {};
  const {
    goodsId,
    hdThumbUrl,
    goodsName,
    linkUrl,
    activityPrice,
    originPrice,
    brandName,
  } = goodsInfo || {};
  const {
    customerNum,
    groupStatus,
    groupUserList,
    groupOrderId,
    groupRemainCount,
  } = groupInfo || {};

  if (groupRemainCount === 0 || groupStatus !== 0)
    return {
      success: false,
      message: "该拼单已经结束",
    };

  const newGroupInfo: any = {
    goodsId,
    hdThumbUrl,
    goodsName,
    linkUrl,
    activityPrice,
    originPrice,
    brandName,
    customerNum,
    expireTime: endTimeMs,
    groupStatus,
    groupUserList,
    groupOrderId,
    groupRemainCount,
  };
  if (openId) {
    const doc = await User.findOne({ openId })
      .exec()
      .catch(() => console.log("获取用户失败"));
    if (doc) {
      console.log("查询用户成功");
      newGroupInfo.user = doc._id;
    }
  }
  const res = await Order.create(newGroupInfo).catch((err) => {
    console.log(err);
  });
  if (res)
    return {
      success: true,
      message: "上传成功",
    };
  return {
    success: false,
    message: "上传失败",
  };
};
