const mongoose = require("mongoose");
const mongodbConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Database is connected");
};

module.exports = mongodbConnect;
