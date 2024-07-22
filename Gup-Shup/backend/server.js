import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json()); 

app.use(express.static("public"));
app.use(cookieParser());

//ROUTES 

import userRouter from "./routes/userRoutes";
import chatRouter from "./routes/chatRoutes";
import userRouter from "./routes/messageRoutes";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

export { app };
