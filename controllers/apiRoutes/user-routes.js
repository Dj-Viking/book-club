const router = require('express').Router();
const fetch = require('node-fetch');
const {User, Club, Library, Book } = require('../../models');
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

  if (!req.body.book_title || !req.body.author) {
    res.status(400).json({error: "The request was in an incorrect format."});
  }

  console.log(req.body);
  // res.status(200).json({message: "post success"});
  try {
    const apiRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.body.book_title}+inauthor:${req.body.author}&key=${process.env.API_KEY}`)
    const json = await apiRes.json();
    // console.log(json);
    bookInfo = {

    }
    //grabbing the first book in the search list for now
    res.status(200).json(json.items);
  } catch (error) {
    console.log(error);
  }
});
//user login post route
router.post('/login', (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request user login', '\x1b[00m');
  console.log(`
  
  `);
  User.findOne(
    {
      where: {
        username: req.body.username
      }
    }
  )
  .then(userData => {
    if (!userData) {
      res.status(400).json({ message: `No user with the username ${req.body.username}`});
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password' });
      return;
    }

    req.session.save(
      () => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        //console.log(req.session);
        res.json({user: userData, message: "You are now logged in!"});
      }
    );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//logout route, destroys sesison variables and resets the cookie
router.post('/logout', (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request user logout', '\x1b[00m');
  console.log(`
  
  `);
  if (req.session.loggedIn) {
    req.session.destroy(
      () => {
        res.status(204).end();
      }
    );
  } else {
    res.status(404).end();
  }
});

// get all users
router.get('/', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to get all users', '\x1b[00m');
  console.log(`
  
  `);
  try {
    const userInfo = await User.findAll(
      {
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Club
          }
        ]
      }
    );
    if (userInfo[0] === undefined) {
      res.status(404).json({error: "No users were found"});
    }
    res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
  }

});

//testing this group seeding for deploying so making a get route to test if groups exist when
// project is deployed to heroku
// works for insomnia but real test is seeing if the seed works at the heroku build time
// works with heroku woot
//get all clubs
router.get('/clubs', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to get all clubs', '\x1b[00m');
  console.log(`
  
  `);
  try {
    const clubInfo = await Club.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'user_id']
          }
        }
      ]
    });
    if (clubInfo[0] === undefined) {
      res.status(404).json({error: "there were no groups found"});
    }
    res.status(200).json(clubInfo);
  } catch (error) {
    console.log(error);
  }
});

//get all books
router.get('/books', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to get all books', '\x1b[00m');
  console.log(`
  
  `);
  try {
    const bookInfo = await Book.findAll();
    console.log(bookInfo);
    if (bookInfo[0] === undefined) {
      res.status(404).json({error: "no books were found"});
    }
    res.status(200).json(bookInfo);
  } catch (error) { 
    console.log(error);
  }
});

//update users club by id
router.put('/clubs/:id', (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to update a user by user id', '\x1b[00m');
  console.log(`
  
  `);
  console.log(req.body);
  /**
   * req.body should be as the following example
   * {
   *  "club_id": 1
   * }
   */
  if (!req.body) {
    res.status(400).json({error: "request formatted incorrectly"});
  }
  try {
    User.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
});


// user adds a book to their library
// router.post('/add', (req, res) => {

// });

module.exports = router;