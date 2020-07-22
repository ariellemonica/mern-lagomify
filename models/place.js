const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = (() => {
  const PlaceSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    type: {
      type: String,
      enum: ['donate', 'sell', 'toss', 'other'],
      default: 'other'
    }
  }, { timestamps: true });

  return mongoose.model('Place', PlaceSchema);
})();
