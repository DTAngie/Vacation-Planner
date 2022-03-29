const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('profiles', {
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

module.exports = Profile;
