const mongoose = require("mongoose");
require("dotenv").config();

const dbconnection = async () => {
  try {
    mongoose.connection.on("error", (err) => {
      console.error("Connection failed!", err);
    });
    mongoose.connection.on("connected", () => {
      console.log("DB connected!");
    });

    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("SERVER DBCONNECTION FAILED!", error);
  }
};

module.exports = dbconnection;
