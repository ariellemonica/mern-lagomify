const router = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');

//Amazon s3 config
AWS.config.update(
  {
    region: 'us-west-1', // Put your aws region here
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

router.post('/upload', upload.single('theseNamesMustMatch'), (req, res) => {
  const directory = 'items';
  const key = `${directory}/${uuid.v4()}`;
  const S3_BUCKET = process.env.Bucket

  console.log(req.file[0]);
  let noSpaces = req.file[0].split(' ');
  let lowerCase = noSpaces.join('-').toLowerCase();
  console.log(lowercase);
  
  // req.file is the 'theseNamesMustMatch' file
  s3.putObject({
      Bucket: 'your-bucket-name',
      Key: 'your-key-name', 
      Body: req.file.buffer,
      ACL: 'public-read', // your permisions  
    }, (err) => { 
      if (err) return res.status(400).send(err);
      res.send('File uploaded to S3');
  })
});

module.exports = router;