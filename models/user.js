const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile: {
    type:DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user'
});

User.prototype.comparePassword = function (tryPassword, cb){
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
}

module.exports = User;