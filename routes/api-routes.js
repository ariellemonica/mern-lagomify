require('dotenv').config();

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

  router.get('/items', (req, res) => {
    // items for sale page...
    db.Item
      .find({ status: 'keep' })
      .then(docs => res.json(docs))
      .catch(err => res.status(422).json(err));
  });

  router.get('/learn', (req, res) => {
    db.Resource
      .find({})
      .then(docs => res.json(docs))
      .catch(err => res.status(422).json(err));
  });

  // router.get('/rooms', (req, res) => {
  //   // rooms and crap ...
  // });

  // hard coded for testing
  // use req.body when you get to it
  router.post('/item', (req, res) => {
    console.log("line 53 in api-routes" + req.body);
    db.Item.create({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      owner: req.body.owner,
      createdBy: req.body.createdBy
    }).then(() => {
      res.send('Successfully added.');
    });
  });

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
  });

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
      console.log('record is updated ... hopefully');
    }).then((itemData) => {
      res.json(itemData);
    })
      .catch((err) => console.log(err));
  });

  // mn - hardcoded find by user - this will need to be updated
  // mn - capture user whose active section this is, pass through
  router.get('/user/view-items', (req, res) => {
    // console.log('this is the item user: ' + req.params.createdBy);
    // req.auth.user.id -- use this for 'createdBy'
    // mongoose populate to grab user's name
    db.Item.find({ createdBy: 'User 2' }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }).then((itemData) => {
      console.log(itemData);
      res.json(itemData);
    }).catch((err) => console.log(err));
  });

  router.put('/user/items/:id', (req, res) => {
    // DEBUG:
    // console.log('We got to api-routes!');

    const updatedStatus =
      (req.body.status === 'true') ? 'keep' : 'toLetGo';

    db.Item
      .updateOne(
        { _id: req.params.id },
        { $set: { status: updatedStatus } })
      .then(result => {
        // DEBUG:
        // console.log(JSON.stringify(result));

        if (result.nModified > 0 && result.ok === 1) {
          res.status(200).json({ updated: true });
        }
      })
      .catch(err => res.status(422).json(err))
      .finally(() => res.end());
  });

  return router;
})();
