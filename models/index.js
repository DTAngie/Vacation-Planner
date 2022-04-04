const User = require('./user');
const Profile = require('./profile');
const Vacation = require('./vacation');
const ProfileVacation = require('./profilesVacations');
const Segment = require('./segment');

/*** Associations ***/
User.hasOne(Profile, {foreignKey: 'user_id'}); //TODO: test to make sure this works
Profile.belongsToMany(Vacation, {through: ProfileVacation, foreignKey: 'profileId'});
Vacation.belongsToMany(Profile, {through: ProfileVacation, foreignKey: 'vacationId'});
Vacation.hasMany(Segment, {foreignKey: 'vacation_id'});
Segment.belongsTo(Vacation, {foreignKey: 'vacation_id'});

/*******/

let db = {};
db.User = User;
db.Profile = Profile;
db.Vacation = Vacation;
db.ProfileVacation = ProfileVacation;
db.Segment = Segment;


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