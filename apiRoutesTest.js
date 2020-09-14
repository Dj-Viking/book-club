//library routes 
const router = require('express').Router(); 
const fetch = require('node-fetch'); 
const Library = require('../../models/Library.js'); 

router.post('/library', (req, res) => {
    Library
})

module.exports = router;