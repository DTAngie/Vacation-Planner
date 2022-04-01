const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('./profile')
const ProfileVacation = require('./profilesVacations');

const Vacation = sequelize.define('vacation', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  budget: {
    type: DataTypes.DECIMAL(11,2),
    min: 0
  },
  passportRequired: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'vacation'
});

module.exports = Vacation;