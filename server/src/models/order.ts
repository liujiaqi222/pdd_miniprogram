import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    goodsName: {
      type: String,
      required: true,
    }, // 商品名称
    goodsId: Number,
    hdThumbUrl: String, // 商品图片
    goodsImg: String,
    activityPrice: String, // 活动价格
    originPrice: String, // 原价
    linkUrl: {
      type: String,
      required: true,
    }, // 商品链接
    groupSize: String,
    groupStatus: Number, // 0: 拼团中, 1: 拼团成功
    customerNum: String, // 几人团
    marketPrice:Number,
    expireTime: Date,
    groupUserList: [{ avatar: String }], //拼单的用户头像
    groupRemainCount: Number, // 还差几个人成团
    groupOrderId: {
      type: String,
      unique: true,
    }, // 拼单id
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    groupOrderType: Number, // 0 普通多人拼团 1多人任意商品团
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
export const ExpiredOrder = mongoose.model(
  "ExpiredOrder",
  OrderSchema,
  "expiredOrders"
);
