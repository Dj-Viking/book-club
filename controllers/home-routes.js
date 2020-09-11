const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Group } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
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