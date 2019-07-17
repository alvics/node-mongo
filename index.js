const express = require('express');
const expressEdge = require('express-edge'); // templating engine
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const edge = require('edge.js');

// .env
require('dotenv').config();

// Controllers
const homePageController = require('./controllers/homePage');
const creatPostController = require('./controllers/createPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const aboutPageController = require('./controllers/aboutPage');
const contactPageController = require('./controllers/contactPage');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

// Initialize / setup
const app = new express();
const port = 4000;
const db_host = process.env.DB_HOST;

// Connect to mongoDB
mongoose.set('useCreateIndex', true);
mongoose.connect(db_host, { useNewUrlParser: true });

// register/set packages
app.use(express.static('public'));

app.set('views', `${__dirname}/views`);

app.use(fileUpload());

app.use(expressEdge);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());

// save session to database
const mongoStore = connectMongo(session);

// send session to mongodb
app.use(
  session({
    secret: 'secret',
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// Register Middleware
const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuth = require('./middleware/redirectIfAuth');

app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId);
  next();
});

// Routes
app.get('/', homePageController);
app.get('/about', aboutPageController);
app.get('/contact', contactPageController);
app.get('/posts/new', auth, creatPostController);
app.post('/posts/store', auth, storePost, storePostController);
app.get('/post/:id', getPostController);

// register/users
app.get('/auth/register', redirectIfAuth, createUserController);
app.post('/users/register', redirectIfAuth, storeUserController);

// login/users
app.get('/auth/login', redirectIfAuth, loginController);
app.post('/users/login', redirectIfAuth, loginUserController);

// logout
app.get('/auth/logout', redirectIfAuth, logoutController);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
