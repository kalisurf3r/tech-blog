const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const blogsRoutes = require('./blogsRoutes');
const commentsRoutes = require('./commentsRoutes');

router.use('/users', usersRoutes);
router.use('/blogs', blogsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
