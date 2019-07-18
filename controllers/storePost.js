const path = require('path');
const Post = require('../database/models/Post');
const cloudaniry = require('cloudinary');

module.exports = (req, res) => {
  const { image } = req.files;
  const uploadPath = path.resolve(__dirname, '../public/posts/', image.name);
  image.mv(uploadPath, error => {
    cloudaniry.v2.uploader.upload(uploadPath, (error, result) => {
      if (error) {
        return res.redirect('/');
      }

      Post.create(
        {
          ...req.body,
          image: result.secure_url,
          author: req.session.userId
        },
        (error, post) => {
          console.log(post);
          res.redirect('/');
        }
      );
    });
  });
};
