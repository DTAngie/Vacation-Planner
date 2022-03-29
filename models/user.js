const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('../models/profile');
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

// User.prototype.createOne = async function(data) {
//   console.log('this is the create one function')
//   let newUser = User.build(data);
//   console.log('new user', newUser)
//   try {
//     const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUNDS);
//     newUser.password = hashedPassword;
//     newUser.save().then(newUser =>{
//       console.log('new user in save function', newUser)
//       return newUser;
//     }).catch((err) => {
//       return err;  
//     });
//   } catch(err) {
//    return err;
//   }
// }

User.hasOne(Profile, {foreignKey: 'owner'});

module.exports = User;