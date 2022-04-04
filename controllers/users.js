const { User, Profile } = require('../models/index')
// const User = require('../models/index');
// const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

module.exports = {
  signup,
  login
}

async function signup(req, res){
// TODO: get rid of profile in parameters
  try {
    const { email, password } = req.body;
    const user = await User.create({email: email, password: password});
    const profile = await Profile.create({owner: user.id});
    const token = createJWT(user);
    res.json({token});
  } catch(err) {
    console.log('second err', err)
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({where:{email: req.body.email}, include: Profile});
    console.log('user is', user)
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
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