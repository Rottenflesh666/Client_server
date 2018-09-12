const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: "string",
  lastName: "string",
  login: "string",
  password: "string",
  meter: { type: mongoose.Schema.Types.ObjectId, ref: "meter" }
});

module.exports = mongoose.model("user", userSchema);
