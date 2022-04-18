const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    field: 'user_id',
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'profile'
});

Profile.prototype.isVacationOwner = function (vacationId){
  if(this.vacations.some(vacation => (vacation.id === vacationId) && (vacation.profilesVacations.isOwner))) {
    return true;
  }
  return false;
}

Profile.prototype.isOnVacation = function (vacationId){
  if(this.vacations.some(vacation => vacation.id === vacationId)) {
    return true;
  }
  return false;
}

module.exports = Profile;
