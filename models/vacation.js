const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = Vacation;