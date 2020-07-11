// build schema for items
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mn - when tamar adds her bit image url will have to change to an array of objects
// mn - the image object will need to contain the aws id and the aws url
const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    imageUrl: { type: String, default: 'http://placehold.it/300x200' },
    status: { type: String, enum: ['donated', 'tossed', 'sold', 'keep'], default: 'keep' },
    // donated: { type: Boolean },
    // tossed: { type: Boolean },
    // sold: { type: Boolean },
    createdBy: { type: String, required: true},
    owner: { type: String },
    date: { type: Date, default: Date.now }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;