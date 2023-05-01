import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  openId: {
    required: true,
  }, // 用户wx唯一标识
  nickName: String, // 用户昵称
  sessionKey: String,
  avatarUrl: String, // 用户头像
});

export const User = mongoose.model("User", UserSchema);
