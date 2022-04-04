const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProfileVacation = sequelize.define('profilesVacations', {
  profileId: {
    type:DataTypes.INTEGER,
    allowNull: false,
    field: 'profile_id',
    references: {
      model: 'Profile',
      key: 'id'
    }
  },
  vacationId: {
    type:DataTypes.INTEGER,
    allowNull: false,
    field: 'vacation_id',
    references: {
      model: 'Vacation',
      key: 'id'
    }
  },
  isOwner: {
    type: DataTypes.BOOLEAN,
    field: 'is_owner'
  }
}, {
  tableName: 'profiles_vacations',
  timestamps: false
});


module.exports = ProfileVacation