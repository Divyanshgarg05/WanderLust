const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Connection URL me Database name 'test' kar diya hai
const MONGO_URL = "mongodb+srv://divyanshgarg844:Divyansh%4087@cluster0.e9v8wce.mongodb.net/test?appName=Cluster0";

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