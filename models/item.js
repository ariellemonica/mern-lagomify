// build schema for items
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    imageUrl: { type: String },
    donated: { type: Boolean },
    tossed: { type: Boolean },
    sold: { type: Boolean },
    date: { type: Date, default: Date.now }
})