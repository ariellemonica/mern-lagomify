require('dotenv');

const mongoose = require('mongoose');
const router = require('express').Router();

// Mongo Database
const db = require('../models');
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/lagomifydb';

// Connect to the Mongo DB
mongoose.connect(
  MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.connection
  .on('error', console.error.bind(
    console, 'There was an error connecting to the database.'))
  .once('connected', () => {
    console.log('Successfully connected to the database.');
  });

// do some things - set up routes
module.exports = (() => {
  // router.get('/', (req, res) => {
  //   // landing page ...
  // });

  // router.get('/items', (req, res) => {
  //   // items for sale page...
  // });

  router.get('/learn', (req, res) => {
    db.Resource
      .find({})
      .then(docs => res.json(docs))
      .catch(err => res.status(422).json(err));
  });

  // router.get('/rooms', (req, res) => {
  //   // rooms and crap ...
  // });

  // router.post('/item/:id', (req, res) => {
  //   // post an item for sale (put it in db) ...
  // });

  // hard coded for testing
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
  });

  // router.get('/*', (req, res) => {
  //   // landing page ...
  // });

  return router;
})();
