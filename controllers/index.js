const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./home-routes.js');
const bookSearchRoutes = require('./bookSearch-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/book-search', bookSearchRoutes);
router.use((req, res)=>{res.status(404).end();});

module.exports = router;