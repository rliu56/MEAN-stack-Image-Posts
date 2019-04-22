const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts'); // import routes

const app = express();

mongoose.connect("mongodb+srv://Mark:rViPgJj3f43IxVkG@cluster0-vm5vy.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static("backend/images")); // allow access to the path

// avoid CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requiested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-ALlow-MethodS",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', postsRoutes); // make the app aware of the routes

module.exports = app;