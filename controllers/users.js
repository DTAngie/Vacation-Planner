const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  signup
}

async function signup(req, res){
  console.log('made it back here');
  const user = await User.create(req.body);
  console.log(user)

}