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
      console.log(userInfo);
      //if user is in a club store the club_id into req.session for later queries
      if (userInfo.dataValues.club_id) {
        req.session.userClub_id = userInfo.dataValues.club_id;
      }
      //get user's clubInfo
      if (req.session.userClub_id) {
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
        console.log(clubInfo);
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
      } else {
        //find all clubs to display in the join club section
        const allClubs = await Club.findAll();
        //console.log(allClubs);
        //filter out the clubs that the current logged in user is not in by club id
        for (let i = 0; i < allClubs.length; i++){
          if(allClubs[i].id !== req.session.userClub_id){
            userNotInTheseClubs.push(allClubs[i]);
          }
        }
        console.log(userNotInTheseClubs);
        res.render('clubs-page', {
          loggedIn: req.session.loggedIn,
          username: req.session.username,
          user_id: req.session.user_id,
          userNonClubs: userNotInTheseClubs
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  } else {
    res.render('homepage');
  }
});

//user leaves current club and renders the page again as if they are not in a club
router.get('/leave-club', async (req, res) => {
  console.log(`
  `);
  console.log("\x1b[33m", "Client request to leave current group and re-render the clubs page", "\x1b[00m");
  console.log(`
  `);
  //check the query sent from the front end...the club_id of the user is embedded into the value of the button appended onto the page
  console.log(req.query);
  const noClub = {
    club_id: null
  }
  if (req.session.loggedIn) {
    //update user's club to be null since they are leaving the club
    try {
      const leaveClub = await User.update
      (
        noClub,
        {
          where: {
            id: req.session.user_id
          }
        }
      );
      //this console.log should just output -> [1] saying a change was made
      console.log(leaveClub);
      //check if the user club_id is null now
      const userInfo = await User.findOne({
        attributes: {
          exclude: ['password']
        },
        where: {
          id: req.session.user_id
        }
      });
      console.log(userInfo);
      //update the req.session.club_id and clubTitle
      req.session.club_id = userInfo.dataValues.club_id;
      req.session.userClubTitle = null;
      console.log(req.session);
      //get all clubs since user left their only club
      const clubInfo = await Club.findAll();
      console.log(clubInfo);
      //store the clubs for passing into handlebars
      const userNotInTheseClubs = [];
      for (let i = 0; i < clubInfo.length; i++) {
        userNotInTheseClubs.push(clubInfo[i]);
      }
      console.log(userNotInTheseClubs);
      res.render('clubs-page', {
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        user_id: req.session.user_id,
        userNonClubs: userNotInTheseClubs
      });
    } catch (error) { 
      console.log(error);
    }
  } else {
    res.status(401).render('homepage');
  }
});

//join club route needs to be a GET request because you can only render on GET requests

module.exports = router;