const { Profile, Vacation, Segment } = require('../models/index')

module.exports = {
  create,
  getVacationsByUser,
  getOne,
  getOneForEdit,
  edit,
  update,
  delete: deleteOne
}

async function create(req, res) {
  const { name , budget, passportRequired } = req.body;
  try {
    const vacation = await Vacation.create({name: name, budget: budget, passportRequired: passportRequired});
    const profile = await Profile.findByPk(req.user.profile.id);
    vacation.addProfile(profile, {through: {isOwner: true}});
    res.json({vacationId: vacation.id}); 
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
      res.json({vacationId: vacation.id});
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
      include: Segment,
      order:[[Segment, 'number']]
    });
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isOnVacation(vacation.id)) {
      console.log('is one vacation')
      res.json({vacation});
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
  console.log('delete function')
  try {
    const vacation = await Vacation.findByPk(req.params.id);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(vacation.id)) {
      console.log(await vacation.getProfiles())
      // await vacation.removeProfiles();
      // TODO: this only works for one user. test when multiple users can view vacation.
      await vacation.setProfiles([]);
      await vacation.save()
      console.log(await vacation.getProfiles())
      await vacation.destroy();
      res.status(200).json('Success');
    } else {
      res.status(401).json();
    }
  } catch(err) {
    console.log(err)
    res.status(400).json();
  }
}