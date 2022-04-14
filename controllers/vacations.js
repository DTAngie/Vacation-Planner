// const Vacation = require('../models/vacation');
// const Profile = require('../models/profile');
const { User, Profile, Vacation, ProfileVacation, Segment } = require('../models/index')
// const User = require('../models/user');
// const ProfileVacations = ('../models/profilesVacations');
// const {Profile, Vacation } = require('../config/database');

module.exports = {
  create,
  getVacationsByUser,
  getOne,
  getOneForEdit,
  edit
}

async function create(req, res) {
  // console.log(req.body);
  // console.log(req.user)
  const { name , budget, passportRequired } = req.body;
  try {
    const vacation = await Vacation.create({name: name, budget: budget, passportRequired: passportRequired});
    const user = await User.findOne({where:{id: req.user.id}, include: Profile});
    vacation.addProfile(user.profile, {through: {isOwner: true}});
    res.status(200).json({}); 
    // TODO do this need a status?
  } catch (err) {
    res.status(400).json(err);
  }
}

async function edit(req, res) {
  try {
    const vacation = await Vacation.findByPk(req.params.id);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(vacation.id)) {
      res.json({vacation});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}

async function getVacationsByUser(req, res) {
  console.log('dashboard')
  console.log(req.user)
  try {
    const user = await User.findByPk(req.user.id, {include: Profile});
    // const user = await User.findOne({where: {id: req.user.id}, include: Profile});
    const vacations = await user.profile.getVacations(); 
    // TODO: drop this table and see if it works with no data
    res.json(vacations);
  } catch(err) {
    console.log('get err is', err)
    res.status(400).json(err);
  }
}


//TODO: ^^will this actually be used? 
//this should be getVacation Segments... use this in place of the one in segments controller
async function getOne(req, res) {
  const profileId = req.user.profile.id;
  try {
    const vacation = await Vacation.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Profile,
          required: true
        }, {
          model: Segment
        }
      ],
      order:[
        [Segment, 'number']
      ]
    });
    if(vacation.profiles.some(profile => profile.id === profileId)) {
      res.json(vacation);
    } else {
      res.status(400).json('Access Denied');
    }
  } catch(err) {
    console.log(err)
    res.status(400).json(err);
  }
}

async function getOneForEdit(req, res) {
  try {
    const vacation = await Vacation.findByPk(req.params.id, {
      include: Profile
    })
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(vacation.id)) {
      res.json({vacation});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}