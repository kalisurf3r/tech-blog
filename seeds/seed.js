const sequelize = require('../config/connection');
const { Users, Blogs } = require('../models');

const usersData = require('./usersData.json');
const blogsData = require('./blogsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const createdUsers = await Users.bulkCreate(usersData, {
    individualHooks: true,
    returning: true, // Ensure you get the created user instances back
  });

  // Map user IDs to blogs
  const updatedBlogsData = blogsData.map((blog, index) => {
    return {
      ...blog,
      user_id: createdUsers[index % createdUsers.length].id, // Assign user_id from the created users
    };
  });

  // Create Blogs with associated user_id
  await Blogs.bulkCreate(updatedBlogsData);
  process.exit(0);
};


seedDatabase();