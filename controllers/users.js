const { User, Profile } = require('../models/index')
const jwt = require('jsonwebtoken');

module.exports = {
  signup,
  login,
  update
}

async function signup(req, res) {
 try {
    const { email, password } = req.body;
    const user = await User.create({email: email, password: password});
    await Profile.create({owner: user.id, username: email});
    await user.getProfile();
    const token = createJWT(user);
    res.json({token});
  } catch(err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({where:{email: req.body.email}, include: Profile});
    if (!user) return res.status(401).json();
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json();
      }
    });
  } catch (err) {
    return res.status(400).json();
  }
}

async function update(req, res) {
  try {
    const profile = await Profile.findByPk(req.user.profile.id);
    await profile.update(req.body);
    await profile.save();
    res.status(200).json({profile});
  } catch(err) {
    res.status(400).json();
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