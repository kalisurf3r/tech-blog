const router = require('express').Router();

// * rmeber to add api routes

const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);

module.exports = router;