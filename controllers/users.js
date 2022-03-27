const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

module.exports = {
  signup,
  login
}

async function signup(req, res){
  const user = User.build(req.body);
  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
    user.save().then(user =>{
      const token = createJWT(user);
      res.json({token});
    }).catch((err) => {
      res.status(400).json(err);  
    });
  } catch(err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({where:{email: req.body.email}});
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