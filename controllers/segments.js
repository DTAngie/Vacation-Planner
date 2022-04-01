const { User, Vacation, Profile, Segment } = require("../models/index");

module.exports = {
  create
}


async function create(req, res) {
  const profileId = req.user.profile.id;
  const { city, state, country } = req.body;
  try {
    const vacation = await Vacation.findOne({where: {id: req.params.id}, include: Profile});
    const user = await User.findOne({where: {id: req.user.id}});
    if(vacation.profiles.some(profile => profile === profileId)) {
      const segment = await Segment.create({city: city, state: state, country: country, vacation: vacation.id});
      res.json({segment});
    } else {
      res.status(400).json('Access Denied');
    }
  } catch (err) {
    res.status(400).json(err)
  }
}