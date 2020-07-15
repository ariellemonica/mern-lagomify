const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = (() => {
  const ResourceSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }

  }, { timestamps: true });

  return mongoose.model('Resource', ResourceSchema);
})();
