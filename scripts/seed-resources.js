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
  },
  // SERG'S ARTICLES BEGIN HERE!
  {
    title: 'How I Choose Items for my 33 Piece Wardrobe',
    link: 'https://www.bemorewithless.com/choose-2/',
    date: null,
    image: '../assets/img/clothes-rack.jpg',
    alt: 'Clothes Hang on Clothes Rack While Women Talk in Background'
  },
  {
    title: 'Becoming Debt-Free: 21-day guide to help you get started',
    link: 'https://www.bemorewithless.com/debt-free//',
    date: null,
    image: '../assets/img/flowers-book-laptop-guide.jpg',
    alt: 'Bouquet of Peonies with a Laptop, an Open Book, and a Pen'
  },
  {
    title: '7 Tiny Steps for the Beginner Minimalist',
    link: 'https://www.bemorewithless.com/begin/',
    date: null,
    image: '../assets/img/board-game-start-space.jpg',
    alt: 'The Start Space on a Board Game'
  },
  {
    title: 'The Little Guide to Digital Decluttering',
    link: 'https://www.bemorewithless.com/digitaldeclutter/',
    date: null,
    image: '../assets/img/desktop-with-planner.jpg',
    alt: 'Desktop Seen from Above, with Coffee, Planner and Sunglasses on Top'
  },
  {
    title: '10 Things to Add to a Simple Life',
    link: 'https://www.bemorewithless.com/10-things-add-simple-life/',
    date: null,
    image: '../assets/img/butterfly-flowers.jpg',
    alt: 'A Closeup of Flowers with a Butterfly On One of Them'
  },
  {
    title: 'Simple Living Manifesto: 72 Ideas to Simplify Your Life',
    link: 'https://www.zenhabits.net/simple-living-manifesto-72-ideas-to-simplify-your-life/',
    date: null,
    image: '../assets/img/victorious-silhouette.jpg',
    alt: 'Silhouette of a Person With Arms Open Victoriously and the Dawn Sky Behind'
  },
  {
    title: '21 Tips on Keeping a Simple Home with Kids',
    link: 'https://www.zenhabits.net/21-tips-on-keeping-a-simple-home-with-kids/',
    date: null,
    image: '../assets/img/family-making-breakfast.jpg',
    alt: 'A Happy Family Makes Breakfast Together in Their Kitchen'
  },
  {
    title: 'The Minimalist Guide to Simple Housework',
    link: 'https://www.zenhabits.net/the-minimalists-guide-to-simple-housework/',
    date: null,
    image: '../assets/img/streamlined-kitchen-brick-wall.jpg',
    alt: 'A Clean and Organized Kitchen with a Brick Wall Backsplash'
  },
  {
    title: '36 Great Tips for Keeping Travel as Simple as Possible (and Two Poems)',
    link: 'https://www.zenhabits.net/36-great-tips-for-keeping-travel-as-simple-as-possible-and-two-poems/',
    date: null,
    image: '../assets/img/toy-minivan-luggage.jpg',
    alt: 'A Toy Minivan with Luggage Stacked on Top, a Real Minivan in the Background'
  },
  {
    title: 'Simplify Your Eating Habits and Meals',
    link: 'https://www.zenhabits.net/simplify-your-eating-habits-and-meals/',
    date: null,
    image: '../assets/img/vegetable-bowl.jpg',
    alt: 'A Japanese Vegetable Bowl and a Small Saucer with Soy Sauce'
  },
  {
    title: 'The Secret to Having a Simplified Schedule',
    link: 'https://www.nosidebar.com/simplified-schedule/',
    date: null,
    image: '../assets/img/yearly-planner-pen.jpg',
    alt: 'Corner of Open Yearly Planner and Pen'
  },
  {
    title: 'A Grace-Filled Beauty Routine',
    link: 'https://www.nosidebar.com/a-grace-filled-beauty-routine/',
    date: null,
    image: '../assets/img/beauty-products.jpg',
    alt: 'A Bottle of Unspecified Beauty Product and Oranments on a Ceramic Tray'
  },
  {
    title: '4 Lessons From My Journey to Eco-Minimalism',
    link: 'https://www.nosidebar.com/eco-minimalism/',
    date: null,
    image: '../assets/img/lone-leaf.jpg',
    alt: 'A Transluscent, Heart-Shaped Leaf'
  },
  {
    title: 'Looking Past the Likes',
    link: 'https://www.nosidebar.com/looking-past-likes/',
    date: null,
    image: '../assets/img/women-side-hug.jpg',
    alt: 'Two Women with Arms Around Each Other Walk Down Rural Path'
  },
  {
    title: 'Cherishing the Old in Light of the New',
    link: 'https://www.nosidebar.com/cherishing-the-old/',
    date: null,
    image: '../assets/img/lawn-chairs.jpg',
    alt: 'Two Bamboo Outdoor Chairs and Side Table with Flowers'
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
