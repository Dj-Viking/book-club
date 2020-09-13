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
  console.log(req.path);
  // res.status(200).json({message: "post success"});
  try {
    const apiRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.body.book_title}+inauthor:${req.body.author}&key=${process.env.API_KEY}`)
    const json = await apiRes.json();
    // console.log(json);
    /**
     *  loop through the json to get the results objects into the array that
     *  we want to respond with, only really want the volume info
    */
   const searchResults = [];
    for(let i = 0; i < json.length; i++) {
      searchResults.push(json[i].volumeInfo);
    };
    console.log("\x1b[33m", "checking the search results array", "\x1b[00m");
    //console.log(searchResults);
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
          },
          {
            model: Book
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
            exclude: ['password']
          },
          include: [
            {
              model: Book,
              attributes: ['book_title']
            }
          ]
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
    const bookInfo = await Book.findAll({});
    console.log(bookInfo);
    if (bookInfo[0] === undefined) {
      res.status(404).json({error: "no books were found"});
    }
    res.status(200).json(bookInfo);
  } catch (error) { 
    console.log(error);
  }
});

//get library
router.get('/library', async (req, res) => {
  const libRes = await Library.findAll();
  res.status(200).json(libRes);
});

//update users club from their user id
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


// user updates the book into their library by which user id is updating their library
// body will have book_id as an array hopefully
router.put('/library/:id', (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', `client request to update a book into the user's library by user id`, '\x1b[00m');
  console.log(`
  
  `);
  //console.log(req.body);
  /**
   * req.body should be as the following example
   * looking to have an array because a user can have many books through the library table
   * so each time any user updates a book to the front end is pushing this number into the 
   * available array array
   * {
   *  "book_ids": [1, 2]
   * }
   */
  if (!req.body) {
    res.status(400).json({error: "request formatted incorrectly"});
  }
  //console.log(req.body);
  //check if the user's user_id is currently in the library
  //then use the library object to manipulate the row where the
  // user id will be and update their book_ids
  Library.findAll(
    {
      where: {user_id: req.params.id}
    }
  )
  .then(library => {
    //get list of current book_ids
    const book_ids = library.map(({book_id})=> book_id);
    //create filtered list of new book_ids
    const newBook_ids = req.body.book_ids
    .filter((book_id) => !book_ids.includes(book_id))
    .map((book_id) => {
      return {
        user_id: req.params.id,
        book_id,
      };
    });
    //figure out which books to remove
    const book_idsToRemove = library
    .filter(({ book_id }) => !req.body.book_ids.includes(book_id))
    .map(({ id }) => id);

    //run both actions
    return Promise.all([
      Library.destroy({
        where: {
          id: book_idsToRemove
        }
      }),
      Library.bulkCreate(newBook_ids),
    ]);
  })
  .then(updatedLibrary => res.status(200).json(updatedLibrary))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;