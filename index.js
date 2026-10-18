require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/db");

// connect to mongo db atlas
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
