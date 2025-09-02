import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import askRoute from "./routes/askRoute.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/ask", askRoute);

app.get("/", (_, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});