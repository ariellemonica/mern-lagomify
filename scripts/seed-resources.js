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

const resourceSeed = [
  {
    title: 'What Is Minimalism?',
    link: 'https://www.becomingminimalist.com/what-is-minimalism/',
    date: new Date(2019, 11, 13),
    image: '../assets/img/green-wooden-chair.jpg',
    alt: 'Green Wooden Chair'
  },
  {
    title: 'The 10 Most Important Things to Simplify in Your Life',
    link: 'https://www.becomingminimalist.com/the-10-most-important-things-to-simplify-in-your-life/',
    date: null,
    image: '../assets/img/plant-in-clear-vase.jpg',
    alt: 'Plant in a Clear Vase'
  },
  {
    title: 'A Helpful Guide to Becoming Unbusy',
    link: 'https://www.becomingminimalist.com/un-busy/',
    date: null,
    image: '../assets/img/standing-man-looking-his-watch.jpg',
    alt: 'Standing Man Looking at His Watch'
  },
  {
    title: 'How to Declutter Your Home: 10 Creative Decluttering Tips',
    link: 'https://www.becomingminimalist.com/creative-ways-to-declutter/',
    date: new Date(2019, 10, 22),
    image: '../assets/img/joshua-with-a-box-of-clutter.jpg',
    alt: 'Joshua Becker with a Box of Clutter'
  },
  {
    title: 'How Many Clothes Do I Need? A Practical Guide to Owning Fewer Clothes',
    link: 'https://www.becomingminimalist.com/a-practical-guide-to-owning-fewer-clothes/',
    date: new Date(2019, 10, 30),
    image: '../assets/img/assorted-clothes-on-hangers.jpg',
    alt: 'Assorted Clothes on Hangers'
  }
];

db.Resource
  .deleteMany({})
  .then(() => db.Resource.collection.insertMany(resourceSeed))
  .then(data => {
    console.log(`${data.result.n} documents inserted into Resource!`);
    process.exit(0);
  })
  .catch(err => {
    console.err(err.stack);
    process.exit(1);
  });
