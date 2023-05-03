import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  openId: {
    required: true,
    type:String,
  }, // 用户wx唯一标识
  nickName: String, // 用户昵称
  sessionKey: String,
  avatarUrl: String, // 用户头像
},{
  timestamps:true,
});

export const User = mongoose.model("User", UserSchema);
