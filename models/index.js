const Users = require('./users');
const Blogs = require('./blogs');

Users.hasMany(Blogs, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

Blogs.belongsTo(Users, {
    foreignKey: 'user_id'
});

module.exports = { Users, Blogs };