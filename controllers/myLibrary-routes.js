const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Club, Book } = require('../models');

//get page and display user's books and club data
router.get('/', async (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to get users data for their library page', '\x1b[00m');
  console.log(`
  
  `);
  if (req.session.loggedIn){
    try {
      //get logged in user's data
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
      console.log(userInfo);
      if (userInfo.club) {
        const club = userInfo.club.dataValues.club_title;
        req.session.userClub_title = club;
        const userBooks = []
        console.log(userInfo.dataValues.books);
        for (let i = 0; i < userInfo.dataValues.books.length; i++){
          userBooks.push(userInfo.dataValues.books[i].dataValues);
        }
        console.log(req.session);
        //console.log(userBooks);
        const dataToHandleBars = {
          club,
          userBooks,
          loggedIn: req.session.loggedIn,
          user_id: req.session.user_id,
          username: req.session.username
        }
        res.render('my-library', dataToHandleBars);
      } else {
        const userBooks = []
        //console.log(userInfo.dataValues.books);
        for (let i = 0; i < userInfo.dataValues.books.length; i++){
          userBooks.push(userInfo.dataValues.books[i].dataValues);
        }
        console.log(req.session);
        //console.log(userBooks);
        const dataToHandleBars = {
          userBooks,
          loggedIn: req.session.loggedIn,
          user_id: req.session.user_id,
          username: req.session.username
        }
        res.render('my-library', dataToHandleBars);
      }
    } catch (error) {
      console.log(error);
    } 
  } else {
    res.status(401).render('homepage');
  }
});

//update users book library collection and render the page again
  // will use similar library manipulation to the api route
//has to be a get because i can only re-render on get requests
router.get('/delete-book/', (req, res) => {
  console.log(`
  
  `);
  console.log('\x1b[33m', 'client request to delete a book from their library', '\x1b[00m');
  console.log(`
  
  `);
  console.log(req.query.book);
  if (req.session.loggedIn) {
    //console.log(req.params.id);
    console.log(req.session);
    //console.log(req.session.userBooks);
    const userBooks = [];
    Library.destroy({
      where: {
        book_id: req.query.book
      }
    })
    .then(libraryInfo => {
      //console.log(libraryInfo)
    })
    .then(
      async () => {
        try {        
          const userInfo = await User.findOne({
            attributes: {
              exclude: ['password']
            },
            include: [
              {
                model: Book
              },
              {
                model: Club
              }
            ]
          });
          console.log(userInfo.dataValues.books);
          //update the userBooks to re-render onto handlebars
          const userBooks = []
          console.log(userInfo.dataValues.books);
          for (let i = 0; i < userInfo.dataValues.books.length; i++){
            userBooks.push(userInfo.dataValues.books[i].dataValues);
          }
          console.log(req.session);
          console.log(userBooks);
          const club = userInfo.club.dataValues.club_title;
          const dataToHandleBars = {
            club,
            userBooks,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            user_id: req.session.user_id,
            
          }
          res.render('my-library', dataToHandleBars)
        } catch (error) {
          console.log(error);
        }
      }
    )
    .catch(error => console.log(error));
  } else {
    res.status(401).json({error: "Unauthorized access to this page, please log in"});
  }
});


module.exports = router;