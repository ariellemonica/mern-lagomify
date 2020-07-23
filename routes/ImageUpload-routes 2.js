import express from 'express';
import multer from 'multer';
import AWS, { S3 } from 'aws-sdk';

// Amazon s3 config
AWS.config.update(
  {
    region: 'us-west-1', // Put your aws region here
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey

  });

const router = new express.Router();
// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 }
});

router.post('/upload', upload.single('theseNamesMustMatch'), (req, res) => {
  // req.files is the 'theseNamesMustMatch' file
  S3.putObject({
    Bucket: lagomify - user - uploads,
    Key: '',
    Body: req.file.buffer,
    ACL: 'public-read' // your permissions
  }, (err) => {
    if (err) return res.status(400).send(err);
    res.send('File uploaded to S3');
  });
});

module.exports = router;
// const router = express.Router();
// const aws = require ('aws=sdk');
// const path = require ('path');

// async function getPresignedUploadUrl(bucket, directory) {
// const key = `${directory}/${uuid.v4()}`;
// const url = await s3
// .getSignedUrl('putObject', {
// Bucket: bucket,
// Key: key,
// ContentType: 'image/*',
// Expires: 300,
// })
// .promise();
// return url;
// }

// Set Storage Engine
// const storage = multer.diskStorage({
// where we want our files uploaded
// destination: './client/public/uploads/',
// filename: function(req, file, cb){
// callback has three parameters: error, filename (with time stamp)
// cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
// }
// });

// Init Upload
// const upload = multer({
// stoarge : storage,
// can limite file size
// limits : {Filesize: 1000000},
// fileFilter: function(req, file, cb){
// checkFileType(file, cb);
// }
// can limit the amount of photos/items uploaded to single or an array of items at one time -> I linked to the Item Added here while they had it linked to an ID of "My Image" in the tutorial
// }).single('ItemAdd');

// Check File Type
// function checkFileType(file, cb){
// create an expression for the file extensions you want
// const filetypes = /jpeg|jpg|png|gif/;
// check the extension
// const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// Check mime
// const mimetype = filetypes.test(file.mimetype);

// if(mimetype && extname){
// return cb(null, true);
// } else {
// cb('Error: Images Only!');
// }
// }

// module.exports = getPresignedUploadUrl;
