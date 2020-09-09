const express = require('express');
const path = require('path');
//const routes = require('./controllers');
//const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

//const helpers = require('.utils/helpers.js');
const exphbars = require('express-handlebars');
const hbars = exphbars.create({});

/* setting the template engine to handlebars */
app.engine('handlebars', hbars.engine);
app.set('view engine', 'handlebars');

//session object stuff will go here

/** express middleware setup **/
//session middleware
// app.use(
//   session.(sess)
// );

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

// the '\x1b[33m' is the color yellow, this is like a shell command to change the text color within this console log
// and i have to close it off with '\x1b[00m' to make all other logs after it to return to its default color
app.listen(PORT, () => {
  console.log('\x1b[33m', `Now Listening on port ${PORT}!`, '\x1b[00m');
});