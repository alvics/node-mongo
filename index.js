const express = require('express');
const expressEdge = require('express-edge'); // templating engine
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

console.log(process.env);

const app = new express();
const port = 4000;
const db_host = process.env.DB_HOST;
const Post = require('./database/models/Post');

mongoose.connect(db_host);

app.use(express.static('public'));

app.set('views', `${__dirname}/views`);

app.use(expressEdge);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.post('/posts/store', (req, res) => {
  Post.create(req.body, (error, post) => {
    console.log(req.body);
    res.redirect('/');
  });

  console.log(req.body);
  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
