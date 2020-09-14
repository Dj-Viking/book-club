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
  const userClubTitle = {};
  const userNotInTheseClubs = [];
  const clubAllUsers = [];
  if (req.session.loggedIn) {
    try {
      const userInfo = await User.findOne({
        attributes: {
          exclude: ['password']
        },
        where: {
          id: req.session.user_id
        }
      });
      //console.log(userClub_id);
      req.session.userClub_id = userInfo.dataValues.club_id;
      //get user's clubInfo
      const clubInfo = await Club.findOne({
        where: {
          id: req.session.userClub_id
        },
        include: [
          {
            model: User,
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
          }
        ]
      });
      //console.log(clubInfo);
      //store club_title
      userClubTitle.club_title = clubInfo.dataValues.club_title;
      req.session.userClubTitle = userClubTitle.club_title;
      
      //find all users in the logged in user's club and store all users and the books they're reading to render on the page
      //console.log(clubInfo.users);
      //get all users and store
      for (let i = 0; i < clubInfo.users.length; i++){
        clubAllUsers.push(clubInfo.users[i]);
      }
      //console.log(clubAllUsers);

      //get list of all the clubs
      const allClubs = await Club.findAll();
      //console.log(allClubs);
      //filter out the clubs that the current logged in user is not in by club id
      for (let i = 0; i < allClubs.length; i++){
        if(allClubs[i].id !== req.session.userClub_id){
          userNotInTheseClubs.push(allClubs[i]);
        }
      }
      console.log(userNotInTheseClubs);
      console.log(req.session);
      res.render('clubs-page', {
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        userClub_id: req.session.userClub_id,
        userClub: req.session.userClubTitle,
        user_id: req.session.user_id,
        clubAllUsers,
        userNonClubs: userNotInTheseClubs
        // userNotInClubs: 
      });  
    } catch (error) {
      console.log(error);
    }
  } else {
    res.render('homepage');
  }
});

module.exports = router;