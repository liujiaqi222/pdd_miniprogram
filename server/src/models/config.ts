import mongoose from "mongoose";

const configSchema = new mongoose.Schema(
  {
    groupUrl: {
      type: String,
      required: true,
    },
    promotionArr: {
      type: [{ url: String, image: String, name: String, prefix: String }],
      required: true,
    },
    officialQrCodeURL: String,
    autoNewGroupURL: String,
    isOnReview: Boolean,
    promotionBanner: {
      isShow: Boolean,
      image: String,
      url: String,
    },
    appType: {
      // 因为存在多个小程序，每个小程序的配置可能不一样
      type: String,
      default: "default",
      unique: true,
    },
    name: {
      // 小程序的名字
      type: String,
      default: "默认",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Config = mongoose.model("Config", configSchema);
