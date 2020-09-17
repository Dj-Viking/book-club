const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Club, Book } = require('../models');


//get delete page render
router.get('/', (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', `client request to render delete account page`, '\x1b[00m');
  console.log(`
  
  `);
  console.log(req.session);
  if (req.session.loggedIn) {
    res.render('delete-account', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      user_id: req.session.user_id
    });
  } else {
    res.render('homepage');
  }
});

//user delete account
router.delete('/delete', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', `client request to delete their user account`, '\x1b[00m');
  console.log(`
  
  `);
  //THIS BODY CONTAINS PASSWORD DO NOT LOG
  //console.log(req.body);
  if (req.body.username && req.body.password) {
    try {
      //find the user we want to delete based on the session info
      //must not exclude the password attribute for the checkpassword method to work.
      const userInfo = await User.findOne({
        where: {
          username: req.body.username
        }
      });
      //just for testing purposes DO NOT SERVER LOG A USER'S PASSWORD NOT EVEN THE HASH
      //console.log(userInfo);
      console.log(userInfo instanceof User); //should be true
      if (userInfo === null || !userInfo) {
        res.status(400).json({error: "user not found"});
        return;
      }
      //validate the password from req.body
      const validPassword = userInfo.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({error: "Invalid Password"});
        return;
      }
      //destroy all the books that the user had in their library
      //first find all entries in the library relating the user to each book the user has
      const booksToDelete = [];
      const libraryInfo = await Library.findAll({
        where: {
          user_id: req.session.user_id
        }
      });
      console.log(libraryInfo)
      //push the books into the array for deletion
      for (let i = 0; i < libraryInfo.length; i++) {
        //find the user and push the book_ids connected to that user into the array
        if (libraryInfo[i].dataValues.user_id === req.session.user_id) {
          booksToDelete.push(libraryInfo[i].dataValues.book_id);
        }
      }
      console.log(booksToDelete);
      // delete the books
      const deletedBooks = await Book.destroy({
        where: {
          id: booksToDelete
        }
      });
      console.log(deletedBooks);
      //check if user is logged in and then destroy the session
      console.log('\x1b[33m', 'checking req.session after session destroy', '\x1b[00m');
      console.log(req.session);
      if (req.session.loggedIn) {
        req.session.destroy
        (
          () => {
            res.status(204).end();
          }
        );
      }
      //destroy the user
      const destroyedUser = await User.destroy(
        {
          where: {
            username: req.body.username
          }
        }
      );
      console.log(destroyedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Internal Server Error"});
    }
  } else {
    res.status(400).json({error: "Invalid credentials"});
  }
});

module.exports = router;