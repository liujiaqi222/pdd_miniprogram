import express, { Express } from "express";
import * as dotenv from "dotenv";
import "express-async-errors";
import { connectDB } from "./db/connection.js";
import { notFound } from "./errors/not-found.js";
import { errorHandlerMiddleWare } from "./errors/error-handler.js";
import orderRoute from "./routes/order.js";
import loginRoute from "./routes/login.js";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/login", loginRoute);
app.use(notFound);
app.use(errorHandlerMiddleWare);

connectDB(process.env.MONGO_URI!)
  .then(async () => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(` running at http://localhost:${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
