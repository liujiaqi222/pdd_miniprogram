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
  },
  {
    timestamps: true,
  }
);

export const Config = mongoose.model("Config", configSchema);
