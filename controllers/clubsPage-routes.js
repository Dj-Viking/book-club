const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Club, Book } = require('../models');

//get clubs page and display all club names with all members in the clubs
router.get('/', async (req, res) => {
  console.log(req.session);
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
      console.log(clubInfo.dataValues);
      res.render('clubs-page', {
        loggedIn: req.session.loggedIn
      });  
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({error: "Unauthorized access to this page, please log in"});
  }
});

module.exports = router;