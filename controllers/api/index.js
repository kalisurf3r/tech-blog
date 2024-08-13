const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const blogsRoutes = require('./blogsRoutes');

router.use('/users', usersRoutes);
router.use('/blogs', blogsRoutes);

module.exports = router;
