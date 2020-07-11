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
  // use req.body when you get to it
  router.post('/item', (req, res) => {
    console.log(req.body);
    db.Item.create({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      owner: 'Test Owner',
      createdBy: 'Test Creator'
    }).then(() => {
      res.send('Successfully added.');
    });
  })

  // mn - simple find item by id - can be modified later
  router.get('/item/:id', (req, res) => {
    console.log('this is the item id: ' + req.params.id);
    db.Item.findById(req.params.id)
      .then((itemData) => {
        console.log(itemData);
        res.json(itemData);
      })
      .catch((err) => console.log(err));
  })

  // mn - update an item by id
  router.post('/item/:id', (req, res) => {
    console.log('this is the item id: ' + req.params.id);

    db.Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location
    }, () => {
      console.log('record is updated ... hopefully')
    }).then((itemData) => {
      res.json(itemData);
    })
    .catch((err) => console.log(err));
  })

  // router.get('/*', (req, res) => {
  //   // landing page ...
  // });

  return router;
})();