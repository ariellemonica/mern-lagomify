// build schema for test
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  key: String
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;