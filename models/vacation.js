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
  budget: DataTypes.DECIMAL(11,2),
  passportRequired: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'vacation'
});

// Profile.belongsToMany(Vacation, {through: ProfileVacation, foreignKey: 'profile'})
// Vacation.belongsToMany(sequelize.models.profile, {through: ProfileVacation, foreignKey: 'vacation'});

module.exports = Vacation;