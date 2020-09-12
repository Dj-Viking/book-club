const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./home-routes.js');
const bookSearchRoutes = require('./bookSearch-routes.js');

router.use('/', homeRoutes)
router.use('/api', apiRoutes);
router.use('/book-search', bookSearchRoutes);

module.exports = router;