const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Use the Render-provided DATABASE_URL if it exists
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Render's PostgreSQL databases require SSL connections
        rejectUnauthorized: false // This prevents issues with self-signed certificates
      }
    }
  });
} else {
  // Fallback for local development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
    }
  );
}

module.exports = sequelize;