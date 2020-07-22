const mongoose = require('mongoose');

// Local resources
const db = require('../models');

// MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/lagomifydb';

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.connection
  .on('error', console.error.bind(
    console, 'There was an error connecting to the database.'))
  .once('connected', () => {
    console.log('Successfully connected to the database.');
  });

const placeSeed = [
  {
    name: 'The Real Real',
    logo: '../assets/img/logos/real-real.jpg',
    link: 'https://www.therealreal.com/',
    type: 'sell'
  },
  {
    name: 'Poshmark',
    logo: '../assets/img/logos/poshmark.png',
    link: 'https://www.poshmark.com/',
    type: 'sell'
  },
  {
    name: '1st Dibs',
    logo: '../assets/img/logos/1stdibs.jpeg',
    link: 'https://www.1stdibs.com/',
    type: 'sell'
  },
  {
    name: 'OfferUp',
    logo: '../assets/img/logos/offerup.png',
    link: 'https://offerup.com/',
    type: 'sell'
  },
  {
    name: 'Donation Town',
    logo: '../assets/img/logos/donation-town.jpeg',
    link: 'https://donationtown.org/',
    type: 'donate'
  },
  {
    name: 'Goodwill',
    logo: '../assets/img/logos/goodwill-alt.jpg',
    link: 'https://www.goodwill.org/',
    type: 'donate'
  },
  {
    name: 'Habitat for Humanity',
    logo: '../assets/img/logos/habitat-for-humanity.png',
    link: 'https://habitat.org/',
    type: 'donate'
  },
  {
    name: 'ThredUp',
    logo: '../assets/img/logos/thredup.png',
    link: 'https://thredup.com/',
    type: 'donate'
  }
];

db.Place
  .deleteMany({})
  .then(() => db.Place.collection.insertMany(placeSeed))
  .then(data => {
    console.log(`${data.result.n} documents inserted into Place!`);
    process.exit(0);
  })
  .catch(err => {
    console.err(err.stack);
    process.exit(1);
  });
