const express = require('express');
const expressEdge = require('express-edge'); // templating engine
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
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

// Initialize / setup
const app = new express();
const port = 4000;
const db_host = process.env.DB_HOST;

// Connect to mongoDB
mongoose.set('useCreateIndex', true);
mongoose.connect(db_host, { useNewUrlParser: true });

// set packages
app.use(express.static('public'));

app.set('views', `${__dirname}/views`);

app.use(fileUpload());

app.use(expressEdge);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

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

// Routes
app.get('/', homePageController);
app.get('/about', aboutPageController);
app.get('/contact', contactPageController);
app.get('/posts/new', auth, creatPostController);
app.post('/posts/store', auth, storePost, storePostController);
app.get('/post/:id', getPostController);

// register/users
app.get('/auth/register', createUserController);
app.post('/users/register', storeUserController);
// login/users
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
