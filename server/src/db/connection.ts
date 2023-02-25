import mongoose from "mongoose";
mongoose.set('strictQuery', true);

export const connectDB = (uri: string) => {
  return mongoose.connect(uri);
}
