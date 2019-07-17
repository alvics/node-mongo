const User = require('../database/models/User');

module.exports = (req, res, next) => {
  // if user has id
  if (req.session.userId) {
    return res.redirect('/');
  }
  next();
};
