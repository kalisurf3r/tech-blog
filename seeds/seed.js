const sequelize = require('../config/connection');
const { Users, Blogs } = require('../models');

const usersData = require('./usersData.json');
const blogsData = require('./blogsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogsData) {
    await Blogs.create({
      ...blog,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();