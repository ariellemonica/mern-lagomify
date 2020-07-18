require('dotenv');
const express = require('express');
const apiRoutes = require('./routes/API-routes');
// const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes.js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
