const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('./profile');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const User = sequelize.define('user', {
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

User.prototype.toJSON = function() {
  let thisUser = Object.assign({}, this.get());
  delete thisUser.password;
  return thisUser;
}

User.prototype.toObject = function() {
  let thisUser = Object.assign({}, this.get());
  delete thisUser.password;
  return thisUser;
}

User.beforeValidate(async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
  } catch(err){
    throw new Error(err)
  }
});


module.exports = User;