const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Club, Book } = require('../models');

//get clubs page and display all club names with all members in the clubs
router.get('/', async (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "Client request for clubs page render", "\x1b[00m");
  console.log(`
  `);
  console.log(req.session);
  const userClub = [];
  if (req.session.loggedIn) {
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
      console.log(clubInfo[0].users);
      for (let i = 0; i < clubInfo.length; i++) {
        //check which club the logged in user is
        //then push that userclub info into handlebars
      }
      res.render('clubs-page', {
        loggedIn: req.session.loggedIn
      });  
    } catch (error) {
      console.log(error);
    }
  } else {
    res.render('homepage');
  }
});

module.exports = router;