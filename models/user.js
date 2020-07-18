// build schema for user
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  google_Id: { type: String, required: false } 
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;