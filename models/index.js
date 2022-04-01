const User = require('./user');
const Profile = require('./profile');
const Vacation = require('./vacation');
const ProfileVacation = require('./profilesVacations');

/*** Associations ***/
User.hasOne(Profile, {foreignKey: 'owner'});
Profile.belongsToMany(Vacation, {through: ProfileVacation, foreignKey: 'profile'});
Vacation.belongsToMany(Profile, {through: ProfileVacation, foreignKey: 'vacation'});

/*******/

let db = {};
db.User = User;
db.Profile = Profile;
db.Vacation = Vacation;
db.ProfileVacation = ProfileVacation;


module.exports = db;









// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);


// const env = process.env.NODE_ENV || 'development';
// // const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//   host: process.env.DATABASE_HOST,
//   dialect: 'postgres',
//   port: 5432
// });

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// module.exports = {sayHello}
// // module.exports = db;