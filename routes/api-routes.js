require('dotenv').config();

const mongoose = require('mongoose');
const multer = require('multer');
const router = require('express').Router();
const AWS = require('aws-sdk');

// Is this used? If not, let's get rid of it.
const s3_bucket = process.env.BUCKET;

// Amazon s3 config
const s3 = new AWS.S3();
// const S3 = require('aws-sdk/clients/s3');
AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

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

module.exports = (() => {
  /* ************************** GET Routes ************************** */
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

  router.get('/places/:type', (req, res) => {
    console.log('We made it to routes!');
    db.Place
      .find({ type: req.params.type })
      .then(docs => res.json(docs))
      .catch(err => res.status(422).json(err));
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

  /* ************************** POST Routes ************************* */
  // hard coded for testing
  // use req.body when you get to it
  router.post('/item', upload.single('image'), (req, res) => {
    console.log(req.owner);
    console.log(req.body);
    //console.log(req.file);

    const presignedURI = `${req.file.originalname.split('.')[0]}-${Date.now()}.${req.file.originalname.split('.')[1]}`.toLowerCase();

    // console.log(presignedURI);

    s3.upload({
      Bucket: 'lagomify-user-uploads',
      Key: presignedURI,
      Body: req.file.buffer
    }, (err, data) => {
      if (err) {
        console.log('Some error: ' + err);
      } else {
        console.log(data);

        let parsedData = JSON.parse(req.body.text);

        db.Item.create({
          name: parsedData.name,
          description: parsedData.description,
          location: parsedData.location,
          owner: parsedData.owner,
          imageUrl: data.Location,
          createdBy: parsedData.createdBy
        }).then(() => {
          res.send('Successfully added.');
        });
      }
    });
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

  /* ************************** PUT Routes ************************** */
  router.put('/user/items/:id', (req, res) => {
    const updatedStatus = req.body.status ? 'keep' : 'toLetGo';

    db.Item
      .updateOne(
        { _id: req.params.id },
        { $set: { status: updatedStatus } })
      .then(result => {
        res.json({ updated: result.nModified > 0 && result.ok === 1 });
      })
      .catch(err => res.status(422).json(err));
  });

  return router;
})();
