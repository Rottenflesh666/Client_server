const mongoose = require("mongoose");

const meterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  light: Number,
  gas: Number,
  water: Number
});

module.exports = mongoose.model("meter", meterSchema);
