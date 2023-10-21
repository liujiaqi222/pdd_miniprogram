import mongoose from "mongoose";

const configSchema = new mongoose.Schema(
  {
    groupUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Config = mongoose.model("Config", configSchema);
