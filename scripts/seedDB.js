const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lagomifydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSeed = [
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 1',
    description: 'Item 1 does something magical and is a keeper',
    location: 'Bedroom',
    owner: 'User 1',
    createdBy: 'User 1'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'tossed',
    name: 'Seeded Item 2',
    description: 'Item 2 does not bring me joy',
    location: 'Living Room',
    owner: 'User 2',
    createdBy: 'User 2'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'donated',
    name: 'Seeded Item 3',
    description: 'Item 3 does not bring me joy but it might bring joy to someone else',
    location: 'Kitchen',
    owner: 'User 3',
    createdBy: 'User 3'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 4',
    description: 'Item 4 brings me joy',
    location: 'Kitchen',
    owner: 'User 1',
    createdBy: 'User 1'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 5',
    description: 'Item 5 brings me joy',
    location: 'Garage',
    owner: 'User 1',
    createdBy: 'User 1'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 6',
    description: 'Item 6 brings me joy',
    location: 'Bedroom',
    owner: 'User 1',
    createdBy: 'User 1'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 7',
    description: 'Item 7 brings User 2 joy',
    location: 'Kitchen',
    owner: 'User 2',
    createdBy: 'User 2'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 8',
    description: 'Item 8 brings User 2 joy',
    location: 'Garage',
    owner: 'User 2',
    createdBy: 'User 2'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 9',
    description: 'Item 9 brings User 2 joy',
    location: 'Bedroom',
    owner: 'User 2',
    createdBy: 'User 2'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 10',
    description: 'Item 10 brings User 3 joy',
    location: 'Kitchen',
    owner: 'User 3',
    createdBy: 'User 3'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 11',
    description: 'Item 11 brings User 3 joy',
    location: 'Garage',
    owner: 'User 3',
    createdBy: 'User 3'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 12',
    description: 'Item 12 brings User 3 joy',
    location: 'Bedroom',
    owner: 'User 3',
    createdBy: 'User 3'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 13',
    description: 'Item 13 brings User 4 joy',
    location: 'Living Room',
    owner: 'User 4',
    createdBy: 'User 4'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 14',
    description: 'Item 14 brings User 4 joy',
    location: 'Garage',
    owner: 'User 4',
    createdBy: 'User 4'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 15',
    description: 'Item 15 brings User 4 joy',
    location: 'Bedroom',
    owner: 'User 4',
    createdBy: 'User 4'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 16',
    description: 'Item 16 brings User 4 joy',
    location: 'Living Room',
    owner: 'User 4',
    createdBy: 'User 4'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 17',
    description: 'Item 17 brings User 5 joy',
    location: 'Garage',
    owner: 'User 5',
    createdBy: 'User 5'
  },
  {
    imageUrl: 'http://placehold.it/300x300',
    status: 'keep',
    name: 'Seeded Item 18',
    description: 'Item 18 brings User 5 joy',
    location: 'Bedroom',
    owner: 'User 5',
    createdBy: 'User 5'
  }
];

db.Item
  .remove({})
  .then(() => db.Item.collection.insertMany(itemSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
