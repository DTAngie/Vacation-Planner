const Vacation = require('../models/vacation');
const Profile = require('../models/profile');
const User = require('../models/user');
const ProfileVacations = ('../models/profilesVacations');
// const {Profile, Vacation } = require('../config/database');

module.exports = {
  create
}

async function create(req, res) {
  // console.log(req.body);
  // console.log(req.user)
  const { name , budget, passportRequired } = req.body;
  
  
  
  /***  ***/
  const vacation = await Vacation.create({name: name, budget: budget, passportRequired: passportRequired});
  console.log('lonely vacation', vacation)
  const user = await User.findOne({where:{id: req.user.id}, include: Profile});
  console.log(user.profile)
  vacation.addProfile(user.profile);
  console.log('addvacation', vacation)
  const theVacations = await vacation.getProfiles();
  console.log('hese are the vacations attached')
  console.log(theVacations)
  // const vacprof = await vacation.hasProfiles({where: {vacation: vacation.id, profile: user.profile.id}});
  // console.log('vacations profiles', vacprof);
  // console.log();
  // const allP = await Vacation.findOne({
  //   where: {id: 'f84bf176-f7ac-4e2a-8b23-ecd7ab62f763' },
  //   include: [Profile]
  // });
  // console.log(allP.profiles);
}