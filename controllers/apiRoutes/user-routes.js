const router = require('express').Router();
const fetch = require('node-fetch');
const User = require('../../models/User.js')
require('dotenv').config();
//import for models will go here

//create a user
router.post('/', (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to create a user', '\x1b[00m');
  console.log(`
  
  `);
  User.create(
    {
      username: req.body.username,
      password: req.body.password
    }
  )
  .then(userModel => {
    req.session.save(
      () => {
        req.session.user_id = userModel.id;
        req.session.username = userModel.username;
        req.session.loggedIn = true;
        res.json(userModel);
      }
    );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("duplicate or wrong format")
  });
}); 

let bookInfo = {}
//test the user form post request which will allow the server to make an https get request
router.post('/search', async (req, res) => {
  //wrap the whole thing in an if conditional checking if the session exists
  // if (req.session) {

  // }
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
    // console.log(json);
    bookInfo = {

    }
    res.status(200).json(json.items[0].volumeInfo);
  } catch (error) {
    console.log(error);
  }
});


// user adds a book to their library
// router.post('/add', (req, res) => {

// });

module.exports = router;