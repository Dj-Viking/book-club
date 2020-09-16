const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Club, Book } = require('../models');

router.get('/', async (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "Client request for homepage render", "\x1b[00m");
  console.log(`
  `);
  console.log(req.session);
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
    res.render('homepage');
  }
});

//get login page
router.get('/login', async (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "Client request for loginpage render", "\x1b[00m");
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
    res.render('login');
  }
});

module.exports = router;