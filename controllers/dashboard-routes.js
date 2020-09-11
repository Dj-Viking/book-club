const router = require('express').Router();
const sequelize = require('../config/connection.js');
const fetch = require('node-fetch');
const { Library, User, Club, Book } = require('../models');
//const { withAuth } = require('../utils/auth.js');

router.get('/', (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "Client request for homepage render", "\x1b[00m");
  console.log(`
  `);
  if (!req.session.loggedIn) {
    res.status(401).json({message: "Unauthorized access of the dashboard, please log in to access."});
  }
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
    username: req.session.username
  });
});

router.post('/search', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to search for a book title and author name', '\x1b[00m');
  console.log(`
  
  `);
  console.log(req.body);
  if (!req.body.book_title || !req.body.author) {
    return;
  }

  // res.status(200).json({message: "post success"});
  try {
    const apiRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.body.book_title}+inauthor:${req.body.author}&key=${process.env.API_KEY}`)
    const json = await apiRes.json();
    console.log(json);
    //grabbing the first book in the search list for now
    res.status(200).json(json.items);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;