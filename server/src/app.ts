import express, { Express } from "express";
import * as dotenv from "dotenv";
import "express-async-errors";
import { authMiddleware } from "./middleware/index.js";
import { connectDB } from "./db/connection.js";
import { notFound } from "./errors/not-found.js";
import { errorHandlerMiddleWare } from "./errors/error-handler.js";
import orderRoute from "./routes/order.js";
import userRoute from "./routes/user.js";
import pddRoute from "./routes/pdd.js";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use("/api/v1/pdd", pddRoute);

// 对接口进行sign校验
app.use(authMiddleware);
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
