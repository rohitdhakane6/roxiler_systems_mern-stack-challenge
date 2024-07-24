import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function main() {
  await connectDB();
  const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

  try {
    const response = await fetch(url);
    const seedData = await response.json();
    const res = await Product.insertMany(seedData);
    console.log("Data successfully seeded:", res);
  } catch (error) {
    console.error("Error seeding data:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  }
}

main();
