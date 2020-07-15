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

  // mn - simple find item by id - can be modified later or chris can blow this away if he's already written something, i wrote this mainly for testing
  // mn - tested in BE via api call
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
  // mn - tested in BE via api call
  // mn - on frontend, what we'll want to do is make sure that the inputs follow the same name-value structure as add item page
  router.post('/item/:id', (req, res) => {
    console.log('this is the item id: ' + req.params.id);
    // if we're allowing more fields to be updated, we can add more
    db.Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      status: req.body.status
    }, () => {
      console.log('record is updated ... hopefully')
    }).then((itemData) => {
      res.json(itemData);
    })
    .catch((err) => console.log(err));
  })

  // mn - hardcoded find by user - this will need to be updated
  // mn - capture user whose active section this is, pass through
  router.get('/user/view-items', (req, res) => {
    // console.log('this is the item user: ' + req.params.createdBy);
    db.Item.find({ createdBy: 'User 2'}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result)
      }
    }).then( (itemData) => {
      console.log(itemData);
      res.json(itemData);
    }).catch((err) => console.log(err));
  })

  return router;
})();