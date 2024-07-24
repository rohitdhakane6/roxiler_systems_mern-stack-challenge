import express, { json } from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
app.use(json);

connectDB();

app.get("/", (req, res) => {
  res.json({ ping: "Successful" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
