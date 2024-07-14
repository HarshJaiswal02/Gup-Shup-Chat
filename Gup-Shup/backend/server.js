import express from "express";
import { config } from "dotenv";
import { chats } from "./data/data.js";

const app = express();

config({
  path: "./.env",
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  //   console.log("Home req :", req.body);
  res.send("Server!! Home");
});

app.get("/api/v1/chats", (req, res) => {
  //   console.log("api point req:", req.body);
  res.send(chats);
});

app.get("/api/v1/chats/:id", (req, res) => {
  const data = chats.filter((c) => c._id === req.params.id);
  console.log(data);
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
