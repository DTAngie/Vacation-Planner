const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vacation = require('./vacation');
// const Vacation = sequelize.models.Vacation;
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
    // TODO: check with another user to make sure this really works
    return true;
  }
  return false;
}

//TODO: check that vacation ID is coming from the right source
Profile.prototype.isOnVacation = function (vacationId){
  if(this.vacations.some(vacation => vacation.id === vacationId)) {
    // TODO: check with another user to make sure this really works
    return true;
  }
  return false;
}

module.exports = Profile;
