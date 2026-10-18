const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

module.exports = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => console.log("Connection ERROR: ", err));
};
