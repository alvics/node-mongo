// create Post model and Schema


const mongoose = require('mongoose');

// set posts
const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
