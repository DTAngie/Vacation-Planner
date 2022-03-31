const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProfileVacation = sequelize.define('profilesVacations', {
  profile: {
    type:DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Profile',
      key: 'profile'
    }
  },
  vacation: {
    type:DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Vacation',
      key: 'vacation'
    }
  },
  isOwner: DataTypes.BOOLEAN
}, {
  tableName: 'profiles_vacations',
  timestamps: false
});


module.exports = ProfileVacation