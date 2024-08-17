const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// * COMMENT on blog
router.post('/post', withAuth, async (req, res) => {
    try {
        const { comment, blogId } = req.body;

        const newComment = await Comment.create({
            comment: comment,
            blogId: blogId,
            userId: req.session.userId,
        });
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;