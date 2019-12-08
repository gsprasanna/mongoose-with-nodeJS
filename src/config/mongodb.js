const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", error => {
  console.log("MongoDB Connection error");
  console.error(error);
});

module.exports = db;
