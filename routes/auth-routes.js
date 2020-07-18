const router = require('express').Router();
const axios = require('axios');
const db = require('../models');

router.post('/user', (req, res) => {
  const userToken = req.headers.authorization.split(' ')[1];
  const presumedGoogleId = req.body.googleId;

  // console.log(presumedGoogleId)

  console.log(req.user);

  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${userToken}`)
    .then((auth) => {
      const data = auth.data;

      if (presumedGoogleId === data.sub) {
        // user is real
        db.User.findOneAndUpdate({ google_Id: data.sub }, {
          email: data.email,
          name: data.name,
          google_Id: data.sub
        },
        { upsert: true, new: true, useFindAndModify: false },
        (err, doc) => {
          if (err) return console.log(err);

          // console.log(doc);
        }).then(() => {
          // let the browser know all was well
          res.status(200).end();
        });
      } else {
        // they are not
        // let teh browser know we caught them faking data
        res.status(401).end();
      }
    });
});

module.exports = router;
