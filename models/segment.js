const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Segment = sequelize.define('segment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  number: {
    type: DataTypes.INTEGER,
    min: 1
  },
  city: DataTypes.STRING,
  state: {
    type: DataTypes.STRING,
    validate: {
      len: [2, 3]
    }
  },
  country: DataTypes.STRING,
  segmentCost: {
    type: DataTypes.DECIMAL(11,2),
    min: 0
  },
  vacation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Vacation',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'segment'
});

module.exports = Segment;