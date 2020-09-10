const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();
//import for models will go here

//test the user form post request which will allow the server to make an https get request
router.post('/search', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to search for a book title and author name', '\x1b[00m');
  console.log(`
  
  `);

  if (!req.body.title || !req.body.author) {
    res.status(400).json({error: "The request was in an incorrect format."});
  }

  console.log(req.body);
  // res.status(200).json({message: "post success"});
  try {
    const apiRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.body.title}+inauthor:${req.body.author}&key=${process.env.API_KEY}`)
    const json = await apiRes.json();
    console.log(json);
    res.status(200).json(json);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;