const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogs extends Model {}

Blogs.init(
    {
        title: {
        type: DataTypes.STRING,
        allowNull: false
        },
        content: {
        type: DataTypes.STRING,
        allowNull: false
        }
    },
    {
        sequelize
    }
    );

module.exports = Blogs;