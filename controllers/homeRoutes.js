const router = require('express').Router();
const { Users, Blogs } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blogs.findAll({
        include: [
            {
            model: Users,
            attributes: ['username'],
            },
        ],
        });
    
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
    
        res.render('home', {
        Blogs: blogs,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    });

    router.get('/home', async (req, res) => {
        try {
            const blogData = await Blogs.findAll({
            include: [
                {
                model: Users,
                attributes: ['username'],
                },
            ],
            });
        
            const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log(blogs);
            res.render('home', {
           Blogs: blogs,
            });
        } catch (err) {
            res.status(500).json(err);
        }
        });

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await Users.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blogs }],
        });
    
        const user = userData.get({ plain: true });
    
        res.render('dash', {
        ...user,
        logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
    });

router.get('/signup', (req, res) => {
        res.render('signup');
});

router.get('/fullblog/:id', async (req, res) => {
    try {
        const blogData = await Blogs.findByPk(req.params.id, {
        include: [
            {
            model: Users,
            attributes: ['username'],
            },
        ],
        });
    
        const blog = blogData.get({ plain: true });
    
        res.render('fullblog', {
        ...blog,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    });

    module.exports = router;