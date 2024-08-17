const Users = require('./users');
const Blogs = require('./blogs');
const Comment = require('./comments');

Users.hasMany(Blogs, {
    onDelete: 'CASCADE',
});

Blogs.belongsTo(Users);

Blogs.hasMany(Comment, {
    onDelete: 'CASCADE',
});

Comment.belongsTo(Blogs);

module.exports = { Users, Blogs, Comment };