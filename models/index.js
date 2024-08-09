const Users = require('./users');
const Blogs = require('./blogs');

Users.hasMany(Blogs, {
    onDelete: 'CASCADE'
});

Blogs.belongsTo(Users);

module.exports = { Users, Blogs };