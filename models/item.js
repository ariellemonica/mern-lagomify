// build schema for items
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    imageUrl: { type: String, default: 'http://placehold.it/300x200' },
    donated: { type: Boolean },
    tossed: { type: Boolean },
    sold: { type: Boolean },
    createdBy: { type: String, required: true},
    owner: { type: String },
    date: { type: Date, default: Date.now }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;