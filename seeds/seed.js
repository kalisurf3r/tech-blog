const sequelize = require('../config/connection');
const { Users, Blogs, Comment } = require('../models');

const usersData = require('./usersData.json');
const blogsData = require('./blogsData.json');
const commentsData = require('./commentsData.json');

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

  const createdComments = await Comment.bulkCreate(commentsData);

  const updatedCommentsData = commentsData.map((comment, index) => {
    return {
      ...comment,
      user_id: createdUsers[index % createdUsers.length].id,
      blog_id: createdComments[index % createdComments.length].id,
    };
  });

  process.exit(0);
};


seedDatabase();