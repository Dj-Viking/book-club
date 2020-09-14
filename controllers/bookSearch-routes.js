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
    const apiRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.query.book_title}+inauthor:${req.query.author}&key=${process.env.API_KEY}`);
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
router.post('/add-book', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to update the user library', '\x1b[00m');
  console.log(`
  
  `);
  console.log(req.session);
  console.log(req.body);
  //create new book into the book table
  const searchedBook_ids = [];
  try {
    const createdBook = await Book.create({
        book_title: req.body.book_title,
        author: req.body.author,
        picture: req.body.picture
    });
    //hold on to the book id we just created
    console.log(createdBook.dataValues.id);
    searchedBook_ids.push(createdBook.dataValues.id);
  
    //place new book within the library with the user id of the user logged in
    //look up the library where the user_id is that we want to update
    Library.findAll(
      {
        where: {
          user_id: req.session.user_id
        }
      }
    )
    .then(library => {
      //get list of current book_ids
      const book_ids = library.map(({book_id}) => book_id);
      //create filtered list of new book_ids
      const newBook_ids = searchedBook_ids
      .filter((book_id) => !book_ids.includes(book_id))
      .map((book_id) => {
        return {
          user_id: req.session.user_id,
          book_id,
        };
      });
      //figure out which books to remove
      const book_idsToRemove = library
      .filter(({ book_id }) => !searchedBook_ids.includes(book_id))
      .map(({ id }) => id);
      
      //run both actions
      return Promise.all([
        // only if we are updating user
        // Library.destroy({
        //   where: {
        //     id: book_idsToRemove
        //   }
        // }),
        Library.bulkCreate(newBook_ids)
      ]);
    })
    //update the session to carry the book_ids in an array for whenever the user logs in
    // the session will remember which book_ids the user has in their library
    .then(updatedLibrary => {
      console.log(updatedLibrary[0][0].dataValues);
      // res.status(200).json(updatedLibrary);
    })
    .then(
      async () => {
        const userBooks = []
        //find all in the library now and update user session with all books in the library currently
        const userInfo = await User.findOne({
          attributes: {
            exclude: ['password']
          },
          include: [
            {
              model: Club
            },  
            {
              model: Book
            }
          ],
          where: {
            id: req.session.user_id
          }
        });
        //console.log(userInfo.dataValues);
        console.log(userInfo.dataValues.books);
        //prep the push to place user books into their session
        for (let i = 0; i < userInfo.dataValues.books.length; i++) {
          userBooks.push(userInfo.dataValues.books[i].dataValues.id);
        }
        console.log(userBooks);
        //place the books array into the user session for later access
        req.session.userBook_ids = userBooks;
        console.log(req.session);
        res.status(200).json({message: "you added a book to your library"});
      }
    )
    .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "internal server error"});
  }
});

module.exports = router;