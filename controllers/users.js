const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

module.exports = {
  signup
}

async function signup(req, res){
  console.log('made it back here');
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json({token});
  } catch(err) {
    res.status(400).json(err);
  }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    process.env.SECRET,
    {expiresIn: '24h'}
  );
}
