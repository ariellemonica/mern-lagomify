require('dotenv').config();

const mongoose = require('mongoose');
const multer = require('multer');
const router = require('express').Router();
const AWS = require('aws-sdk');
const directory = 'items';
//const key = `${directory}/${uuid.v4()}`;
const s3_bucket = process.env.BUCKET;

//const presignedGETURL = s3.getSignedUrl('getObject', {
  //Bucket: s3_bucket,
  //Key: 'example.png',
  //Expires: 300, 
  //Body: req.file.buffer,
  //ACL: 'public-read', // your permisions  
  //}, (err) => { 
  //if (err) return res.status(400).send(err);
  //console.log ("please work");
  //res.send('File uploaded to S3');ds
//});

//const presignedPUTURL = s3.getSignedUrl('putObject', {
  //Bucket: s3_bucket,
  //Key: 'example.png', 
  //Expires: 300,
  //Body: req.file.buffer,
  //ACL: 'public-read', // your permisions  
  //}, (err) => { 
  //if (err) return res.status(400).send(err);
  //console.log ("please work");
  //res.send('File uploaded to S3');
//});

//Amazon s3 config
const s3 = new AWS.S3();
//const S3 = require('aws-sdk/clients/s3');
AWS.config.update(
  {
    region: 'us-west-1', 
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
  });

//Multer config
//memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  //file size limitation in bytes
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
  router.post('/item', upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    //console.log(req.file[0]);
    //let noSpaces = req.file[0].split(' ');
    //let lowerCase = noSpaces.join('-').toLowerCase();
    //console.log(lowercase);

    //async function getPresignedUploadUrl(bucket, directory) {
      //const key = `${directory}/${uuid.v4()}`;
      //const url = await s3
      //.getSignedUrl('putObject', {
      //Bucket: s3_bucket,
      //Key: key, //file name
      //Body: req.file.buffer,
      //ACL: 'public-read', // your permisions  
      //Expires: 300 //time to expire in seconds
    //}, (err) => { 
      //if (err) return res.status(400).send(err);
      //res.send('File uploaded to S3');
    //});


    s3.upload({
      Bucket: 'lagomify-user-uploads',
      Key: 'image.png',
      Body: req.file.buffer
    }, (err, data) => {
      if (err) {
        console.log('Some error: ' + err);
      } else {
        console.log(data);
        res.send('Done');
      }
    });

    //s3.getSignedUrl('putObject', {
        //Bucket: s3_bucket,
        //Key: 'example.png', 
        //Body: req.file.buffer,
        //ACL: 'public-read', // your permisions  
      //}, (err) => { 
        //if (err) return res.status(400).send(err);
        //console.log ("please work");
        //res.send('File uploaded to S3');
    //});

    //db.Item.create({
    //name: req.body.name,
    //description: req.body.description,
    //location: req.body.location,
    //owner: 'Test Owner',
    //imageUrl: 'https://aws.s3_bucket.com/190284312k31h23k.png',
    //createdBy: 'Test Creator'
    //}).then(() => {
    //res.send('Successfully added.');
    //});
    
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
        res.json(result)
      }
    }).then( (itemData) => {
      console.log(itemData);
      res.json(itemData);
    }).catch((err) => console.log(err));
  });

  return router;
})();
