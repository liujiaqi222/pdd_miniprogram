import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  role:{
    type: String,
    enum: ["admin", "superAdmin"],
    default: "admin",
  }
});

AdminSchema.pre('save', async function(next){
  if(this.isModified('password')){
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
  next();
})


export const Admin = mongoose.model("Admin", AdminSchema);

