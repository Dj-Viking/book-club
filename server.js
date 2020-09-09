const express = require('express');
const path = require('path');
//const routes = require('./controllers');
const sequelize = require('./config/connection.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

//const helpers = require('.utils/helpers.js');
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
  cookie: {},
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

//routes middleware
//app.use(routes);

//sequelize sync will go here and .then() into server port listen
//connect to the database
// and set force to false if we're making constant changes on the back end sequelize models
// set to true if we want data to persist since we are not touching the sequelize in that case
sequelize.sync(
  {
    force: true
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
.catch(error => console.log(error));
