const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Club, Book } = require('../models');

//get page and display user's books and club data
router.get('/', async (req, res) => {

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
    const club = userInfo.club.dataValues.club_title;
    const userBooks = []
    console.log(userInfo.dataValues.books);
    for (let i = 0; i < userInfo.dataValues.books.length; i++){
      userBooks.push(userInfo.dataValues.books[i].dataValues);
    }
    console.log(req.session);
    console.log(userBooks);
    const dataToHandleBars = {
      club,
      userBooks,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      username: req.session.username
    }
    res.render('my-library', dataToHandleBars);
  } catch (error) {
    console.log(error);
  }
});

//get all clubs to display which one they are not in

//update users club association


//update users book library collection and render the page again
  // will use similar library manipulation to the api route
//has to be a get because i can only re-render on get requests
router.get('/delete-book/:id', (req, res) => {
  console.log(req.params.id);
  console.log(req.session);
  //console.log(req.session.userBooks);
  const userBooks = [];
  Library.destroy({
    where: {
      book_id: req.params.id
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
});


module.exports = router;