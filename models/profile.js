const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vacation = require('./vacation');
const ProfileVacation = require('./profilesVacations');

const Profile = sequelize.define('profile', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  username: DataTypes.STRING,
  owner: {
    type:DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'profile'
});

Profile.belongsToMany(Vacation, {through: ProfileVacation, foreignKey: 'profile'})
Vacation.belongsToMany(Profile, {through: ProfileVacation, foreignKey: 'vacation'});

module.exports = Profile;
