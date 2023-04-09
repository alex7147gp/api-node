const mongoose = require("mongoose");

async function connectDb(url) {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error(error));
}

module.exports = connectDb;