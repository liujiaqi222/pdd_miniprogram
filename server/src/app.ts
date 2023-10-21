import express, { Express } from "express";
import * as dotenv from "dotenv";
import "express-async-errors";
import { connectDB } from "./db/connection.js";
import { notFound } from "./errors/not-found.js";
import { errorHandlerMiddleWare } from "./errors/error-handler.js";
import orderRoute from "./routes/order.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import configRoute from "./routes/config.js";
// import pddRoute from "./routes/pdd.js";

dotenv.config();
const app: Express = express();
app.use(express.json());

/** 这个是使用pdd的接口，用来后端方便调试，没有必要暴露，因为前端可以直接调用pdd的接口 */
// app.use("/api/v1/pdd", pddRoute);

app.use('/api/v1/config',configRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/user", userRoute);
app.use(notFound);
app.use(errorHandlerMiddleWare);
connectDB(process.env.MONGO_URI!)
  .then(async () => {
    app.listen(process.env.PORT || 4000, () => {
      // import("./cron/index.js");
      console.log(`running at http://localhost:${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
