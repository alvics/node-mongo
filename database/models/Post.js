// create Post model and Schema

const mongoose = require('mongoose');

// set posts
const PostSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  username: String,
  image: String,
  createAt: {
    type: Date,
    default: new Date()
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
