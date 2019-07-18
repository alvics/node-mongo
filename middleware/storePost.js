// Required fields for Post form
module.exports = (req, res, next) => {
  if (!req.files.image || !req.body.subtitle || !req.body.content) {
    return res.redirect('/posts/new');
  }

  next();
};
