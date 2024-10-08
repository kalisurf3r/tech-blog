const router = require('express').Router();
const { Blogs } = require('../../models');
const withAuth = require('../../utils/auth');

// * CREATE new blog
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blogs.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// * DELETE blog
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blogs.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
