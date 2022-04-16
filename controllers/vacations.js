const { Profile, Vacation, Segment, User } = require('../models/index')

module.exports = {
  create,
  getVacationsByUser,
  getOne,
  getOneForEdit,
  edit,
  update,
  delete: deleteOne,
  addFriend,
  removeFriend
}

async function create(req, res) {
  const { name , budget, startDate, endDate, passportRequired } = req.body;
  try {
    const vacation = await Vacation.create({
      name: name,
      budget: budget,
      startDate: startDate,
      endDate: endDate,
      passportRequired: passportRequired
    });
    const profile = await Profile.findByPk(req.user.profile.id);
    vacation.addProfile(profile, {through: {isOwner: true}});
    res.json({vacation}); 
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

async function update(req, res) {
  try {
    const vacation = await Vacation.findByPk(req.params.id);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(vacation.id)) {
      await vacation.update(req.body);
      await vacation.save();
      res.json({vacation});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}

async function getVacationsByUser(req, res) {
  try {
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    res.json({vacations: profile.vacations});
  } catch(err) {
    res.status(400).json(err);
  }
}

async function getOne(req, res) {
  try {
    const vacation = await Vacation.findByPk(req.params.id, {
      include: [
        {
          model: Segment,
          order:[[Segment, 'number']]
        },
        {
          model: Profile
        }
      ]
    });
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isOnVacation(vacation.id)) {
      const isOwner = profile.isVacationOwner(vacation.id);
      res.json({vacation, isOwner});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json(err);
  }
}

async function getOneForEdit(req, res) {
  try {
    const vacation = await Vacation.findByPk(req.params.id)
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

async function deleteOne(req, res) {
  try {
    const vacation = await Vacation.findByPk(req.params.id);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(vacation.id)) {
      await vacation.destroy();
      res.status(200).json('Success');
    } else if(profile.isOnVacation(vacation.id)) {
      profile.removeVacation(vacation);
      res.status(200).json();
    } else {
      res.status(401).json();
    }
  } catch(err) {
    console.log(err)
    res.status(400).json();
  }
}

async function addFriend(req, res) {
  try {
    const vacation = await Vacation.findByPk(req.params.id);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isOnVacation(vacation.id)) {
      const friend = await User.findOne({where:{email: req.body.email}, include: Profile});
      vacation.addProfile(friend.profile);
      res.json({friend: friend.profile});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    console.log(err)
    res.status(400).json()
  }
}

async function removeFriend(req, res) {
  try {
    const vacation = await Vacation.findByPk(req.params.id);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isOnVacation(vacation.id)) {
      const friend = await Profile.findByPk(req.params.friendId, {include: Vacation});
      await friend.removeVacation(vacation);
      res.status(200).json('Success');
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}