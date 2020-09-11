const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Library, User, Group } = require('../models');
// const { withAuth } = require('../utils/auth.js');

router.get('/', (req, res) => {
  res.render('dashboard');
});


module.exports = router;