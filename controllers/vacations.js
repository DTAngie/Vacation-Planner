// const Vacation = require('../models/vacation');
// const Profile = require('../models/profile');
const { Profile, Vacation, ProfileVacation } = require('../models/index')
const User = require('../models/user');
// const ProfileVacations = ('../models/profilesVacations');
// const {Profile, Vacation } = require('../config/database');

module.exports = {
  create
}

async function create(req, res) {
  // console.log(req.body);
  // console.log(req.user)
  const { name , budget, passportRequired } = req.body;
  try {
    const vacation = await Vacation.create({name: name, budget: budget, passportRequired: passportRequired});
    const user = await User.findOne({where:{id: req.user.id}, include: Profile});
    vacation.addProfile(user.profile);
    res.status(200).json({});
  } catch (err) {
    res.status(400).json(err);
  }
}