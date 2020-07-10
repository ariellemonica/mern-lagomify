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
  // router.get('/', (req, res) => {
  //   // landing page ...
  // });

  // router.get('/items', (req, res) => {
  //   // items for sale page...
  // });

  // router.get('/learn', (req, res) => {
  //   // learn more page ...
  // });

  // router.get('/rooms', (req, res) => {
  //   // rooms and crap ...
  // });

  // router.post('/item/:id', (req, res) => {
  //   // post an item for sale (put it in db) ...
  // });

  //hard coded for testing
  router.post('/additem', (req, res) => {
    db.Item.create({
      name: 'Sunglasses',
      description: 'Luminous Green',
      location: 'Bakersfield',
      imageUrl: 'https://www.someimage.com/image.png/',
      donated: false,
      tossed: false,
      sold: false,
      owner: 'Diarmuid',
      createdBy: 'Diarmuid'
    }).then(() => {
      res.send('Successfully added.');
    });
  })

  // router.get('/*', (req, res) => {
  //   // landing page ...
  // });


  return router;
})();