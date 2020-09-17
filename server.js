const express = require('express');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection.js');
require('dotenv').config();
const { User, Club, Book, Library } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// const helpers = require('./utils/helpers.js');
const exphbars = require('express-handlebars');
const hbars = exphbars.create({});

/* setting the template engine to handlebars */
app.engine('handlebars', hbars.engine);
app.set('view engine', 'handlebars');

//session object stuff will go here
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SECRET,
  cookie: {
    // for client connections https only but if accessing from http must set a proxy!
    // be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
    // secure: true
    //sameSite: 'lax'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore(
    {
      db: sequelize
    }
  )
}

/** express middleware setup **/
//session middleware
//If you have your node.js behind a proxy and are using secure: true, you need to set “trust proxy” in express:
// app.set('trust proxy', 1) // trust first proxy
app.use(
  session(sess)
);

//json middleware
app.use(
  express.json()
);

//urlencoded middleware
app.use(
  express.urlencoded(
    {
      extended: true
    }
  )
);

app.use(
  express.static(
    path.join(
      __dirname, 'public'
    )
  )
);

//routes middleware
app.use(routes);

//sequelize sync will go here and .then() into server port listen
//connect to the database
// and set force to true if we're making constant changes on the back end sequelize models and need to sync new changes
// set to false if we want data to persist since we are not touching the sequelize models if they are set in stone 

sequelize.sync(
  {
    force: false
  }
)
.then(//listen on the PORT
  () => {
    console.log("\x1b[33m", "Connecting to Database", "\x1b[00m");
    
    // the '\x1b[33m' is the color yellow, this is like a shell command to change the text color within this console log
    // and i have to close it off with '\x1b[00m' to make all other logs after it to return to its default color
    app.listen(PORT, () => {
      console.log('\x1b[33m', `Now Listening on port ${PORT}!`, '\x1b[00m');
    });
  }
)
.then(//seed the club table with data
  () => {
    setTimeout(async () => {
      try {
        console.log(``);
        console.log("\x1b[33m", "seeding club table with data...", "\x1b[00m");
        const clubInfo = await Club.findAll();//check if Clubs exist already
        //console.log(clubInfo);
        if(clubInfo[0] === undefined) {//if none exist create them
          Club.create({
            club_title: "Fantasy"
          });
          Club.create({
            club_title: "Horror"
          });
          Club.create({
            club_title: "Romance"
          });
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);
  }
)
.then(// seed a test user
  () => {
    setTimeout(async () => {
      console.log(``);
      console.log("\x1b[33m", "seeding user table with data...", "\x1b[00m");
      try {
        const userInfo = await User.findAll();
        //console.log(userInfo);
        if (userInfo[0] === undefined) {
          const userCreate1 = await User.create({
            username: "asdf",
            password: "asdf",
            club_id: 1
          });
          const userCreate2 = await User.create({
            username: 'mario',
            password: 'mario',
            club_id: 1
          });
          //console.log(userCreate);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  }
)
// .then(// seed a test book
//   () => {
//     setTimeout(async () => {
//       console.log(``);
//       console.log("\x1b[33m", "seeding book table with data...", "\x1b[00m");
//       try {
//         const bookInfo = await Book.findAll();
//         //console.log(bookInfo);
//         if (bookInfo[0] === undefined) {
//           const bookCreate1 = await Book.create({
//             book_title: "Flowers for Algernon",
//             author: "Daniel Keyes",
//             picture: "http://books.google.com/books/content?id=gK98gXR8onwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
//           });
//           //console.log(bookCreate1);
//           const bookCreate2 = await Book.create({
//             book_title: "The Fellowship of the Ring (the Lord of the Rings, Book 1)",
//             author: "J.R.R. Tolkien",
//             picture: "http://books.google.com/books/content?id=CalSzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
//           });
//         }
//       } catch (error){
//         console.log(error);
//       }
//     }, 500)
//   }
// )
.catch(error => console.log(error));