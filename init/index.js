if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Connection URL me Database name 'test' kar diya hai
// Hardcoded password remove karke environment variable use karo:
const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.1:27017/test";

main()
  .then(() => {
    console.log("Connected to test DB successfully");
    seedDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const seedDB = async () => {
  await Listing.deleteMany({});
  
  // Screenshot waala exact Owner ID attach kar rahe hain
  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: "6a679a6bfa49752877e4498b"
  }));

  await Listing.insertMany(updatedData);
  console.log("Data successfully inserted into 'test' database!");
};