const mongoose = require('mongoose');
require('dotenv').config();

const Post = require('./database/models/Post');
const db_host = process.env.DB_HOST;
mongoose.connect(db_host, { useNewUrlParser: true });

// read from the database with find({}) = lists all objects in database. To find a single blog by title, use find({title:'Name of title'})
Post.find({}, (error, posts) => {
  console.log(error, posts);
});

// find by ID
// Post.findById('5d2a5bf1a246de3d0c6b9e18', (error, post) => {
//   console.log(error, post);
// });

// refresh database after findByIdAndUpdate()
// Post.findByIdAndUpdate('5d2a5bf1a246de3d0c6b9e18', {
//     title: 'My First Updated Title'
// }, (error, post) => {
//     console.log(error, post)
// })

// create posts with the Post model
// Post.create(
//   {
//     title: 'My Second Blog Post!',
//     description: 'Learn Front to Back Web Development',
//     content:
//       "This is my second blog to mongodb. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
//   },
//   (error, post) => {
//     console.log(error, post);
//   }
// );
