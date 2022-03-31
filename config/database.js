// const { Pool } = require('pg');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  port: 5432
});

// const modelDefiners = [
// 	require('../models/user'),
// 	require('../models/profile'),
// 	require('../models/vacation'),
//   require('../models/profilesVacation'),
	// Add more models here...
	// require('./models/item'),
// ];

// We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
// 	modelDefiner(sequelize);
// }

module.exports = sequelize;