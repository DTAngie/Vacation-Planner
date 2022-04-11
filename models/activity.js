const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('activity', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: DataTypes.TIME,
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: DataTypes.STRING,
  cost: {
    type: DataTypes.DECIMAL(11,2),
    min: 0,
    field: 'cost'
  },
  ticketsPurchased: {
    type: DataTypes.BOOLEAN,
    field: 'tickets_purchased'
  },
  segmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'segment_id',
    references: {
      model: 'Segment',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'activity'
});

module.exports = Activity;