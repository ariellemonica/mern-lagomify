require('dotenv');
const mongoose = require('mongoose');
const router = require("express").Router();

// Mongo Database
const db = require('../models');

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lagomifydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// do some things - set up routes
module.exports = (() => {
  router.get('/', (req, res) => {
    // landing page ...
  });

  router.get('/items', (req, res) => {
    // items for sale page...
  });

  router.get('/learn', (req, res) => {
    // learn more page ...
  });

  router.get('/rooms', (req, res) => {
    // rooms and crap ...
  });

  router.post('/item/:id', (req, res) => {
    // post an item for sale (put it in db) ...
  });

  router.get('/test', (req, res) => {
    db.Test.create({
      key: 'arbitrary'
    })
  })

  router.get('/*', (req, res) => {
    // landing page ...
  });


  return router;
})();