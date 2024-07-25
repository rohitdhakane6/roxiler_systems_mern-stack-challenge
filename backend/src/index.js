import express, { json } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from "./config/db.js";
import router from "./router/index.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(json());
app.use(cors())
app.use('/api',router)

connectDB();

app.get("/", (req, res) => {
  res.json({ ping: "Successful" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


