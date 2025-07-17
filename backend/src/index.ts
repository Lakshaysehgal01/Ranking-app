import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./lib/db";
import userRouter from "./routes/user.route";
dotenv.config({ quiet: true });
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

app.listen(port, () => {
  console.log("App is listening on port " + port);
  connectToDb();
});
