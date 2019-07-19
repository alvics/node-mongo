const Post = require('../database/models/Post');

module.exports = async (req, res) => {
  const posts = await Post.find({}).populate('author');
  console.log(posts);

  res
    .render('index', {
      posts
    })
    .catch(error =>
      process.on('unhandledRejection', (reason, promise) => {
        promise.reject(typeof error === 'string' ? error : error.message);
      })
    );
};
