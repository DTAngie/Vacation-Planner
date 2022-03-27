const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UNSAFE_NavigationContext } = require('react-router-dom');

const SALT_ROUNDS = 6;

module.exports = {
  signup
}

async function signup(req, res){
  console.log('made it back here');
  const user = User.build(req.body);
  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
    user.save()
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