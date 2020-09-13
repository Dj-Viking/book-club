const router = require('express').Router();
const sequelize = require('../config/connection.js');
const fetch = require('node-fetch');
const { Library, User, Club, Book } = require('../models');
//const { withAuth } = require('../utils/auth.js');

router.get('/', (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "Client request for book-search render", "\x1b[00m");
  console.log(`
  `);
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.status(401).json({message: "Unauthorized access of the dashboard, please log in to access."});
  }
  res.render('book-search', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
    username: req.session.username
  });
});

router.get('/search', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to search for a book title and author name', '\x1b[00m');
  console.log(`
  
  `);
  console.log(req.session);
  console.log(req.query);
  // res.status(200).json({message: "post success"});
  try {
    if (req.query.book_title === '' || req.query.author === '') {
      res.status(400).json({error: "cannot leave search fields blank"});
    }
    const apiRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.query.book_title}+inauthor:${req.query.author}&key=${process.env.API_KEY}`)
    const json = await apiRes.json();
    /**
     *  loop through the json to get the results objects into the array that
     *  we want to respond with, only really want the volume info
    */
    const bookData = [];
    for(let i = 0; i < json.items.length; i++) {
      bookData.push(json.items[i].volumeInfo);
    };
    for (let i = 0; i < bookData.length; i++) {
      bookData[i].bookId = i + 1;
    }
    // console.log("\x1b[33m", "checking the search results array", "\x1b[00m");
    // console.log(bookData[0].bookId); should be 1
    //create object to send to handlebars to render through each book-info partial
    const books = {
      searchResults: bookData,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      username: req.session.username
    }
    //res.status(200).render('book-search', books);
    res.render("book-search", books);
    // res.status(200).json(bookData);
  } catch (error) {
    console.log(error);
  }
});

//user posting book to update their library
router.post('/add-book', (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to update the user library', '\x1b[00m');
  console.log(`
  
  `);
});

module.exports = router;