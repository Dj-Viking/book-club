const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Club, Book } = require('../models');

router.get('/', (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "Client request for homepage render", "\x1b[00m");
  console.log(`
  `);
  console.log(req.session);
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    user_id: req.session.user_id
  });
});

//get login page
router.get('/login', (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "Client request for loginpage render", "\x1b[00m");
  console.log(`
  `);
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;