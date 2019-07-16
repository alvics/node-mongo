const express = require('express');
const expressEdge = require('express-edge'); // templating engine
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

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

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts
  });
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.post('/posts/store', (req, res) => {
  Post.create(req.body, (error, post) => {
    res.redirect('/');
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post
  });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
