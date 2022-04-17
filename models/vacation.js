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
  budget: {
    type: DataTypes.DECIMAL(11,2),
    min: 0
  },
  startDate: {
    type: DataTypes.DATEONLY,
    field: 'start_date'
  },
  endDate: {
    type: DataTypes.DATEONLY,
    field: 'end_date'
  },
  passportRequired: {
    type: DataTypes.BOOLEAN,
    field: 'passport_required'
  }
}, {
  sequelize,
  modelName: 'vacation'
});

module.exports = Vacation;