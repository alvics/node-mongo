const express = require('express');
const expressEdge = require('express-edge'); // templating engine
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();

// Controllers
const homePageController = require('./controllers/homePage');
const creatPostController = require('./controllers/createPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const aboutPageController = require('./controllers/aboutPage');
const contactPageController = require('./controllers/contactPage');

// setup
const app = new express();
const port = 4000;
const db_host = process.env.DB_HOST;

// Connect to mongoDB
mongoose.connect(db_host, { useNewUrlParser: true });

// Initialize
app.use(express.static('public'));

app.set('views', `${__dirname}/views`);

app.use(fileUpload());

app.use(expressEdge);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Register Middleware
const storePost = require('./middleware/storePost');

app.use('/posts/store', storePost);

// Routes
app.get('/', homePageController);
app.get('/about', aboutPageController);
app.get('/posts/new', creatPostController);
app.post('/posts/store', storePostController);
app.get('/post/:id', getPostController);

app.get('/contact', contactPageController);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
