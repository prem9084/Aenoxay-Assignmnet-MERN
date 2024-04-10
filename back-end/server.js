import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/db.js";
import userRoute from "./routes/userRoute.js";
import morgan from "morgan";

const app = express();
dotenv.config();
connectDb();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
