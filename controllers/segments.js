const { Vacation, Profile, Segment, Activity } = require("../models/index");

module.exports = {
  create,
  getOne,
  getOneForEdit,
  edit,
  update,
  delete: deleteOne
}


async function create(req, res) {
  const { city, state, country, number } = req.body;
  try {
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(req.params.id)) {
      const segment = await Segment.create({
        number: number,
        city: city,
        state: state,
        country: country,
        cost: 0,
        vacationId: req.params.id
      });   
      res.json({segmentId: segment.id});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json()
  }
}

async function edit(req, res) {
  try {
    const segment = await Segment.findByPk(req.params.segmentId, {include: Vacation});
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(segment.vacation.id)) {
      res.json({segment});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}

async function update(req, res) {
  try {
    const segment = await Segment.findByPk(req.params.segmentId);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(segment.vacationId)) {
      await segment.update(req.body);
      await segment.save();
      res.json({segmentId: segment.id});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}

async function getOne(req, res) {
    try {
    const segment = await Segment.findByPk(req.params.segmentId, { 
      include: [
        {
          model: Vacation,
          required: true,
        }, {
          model: Activity
        }
      ],
      order: [
        [Activity, 'date'],
        [Activity, 'time']
      ]
    });
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isOnVacation(segment.vacation.id)) {
      res.json({segment});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}

async function getOneForEdit(req, res) {
  try {
    const segment = await Segment.findByPk(req.params.segmentId, {include: Vacation});
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(segment.vacation.id)) {
      res.json({segment});
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}

async function deleteOne(req, res) {
  try {
    const segment = await Segment.findByPk(req.params.segmentId);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(segment.vacationId)) {
      await segment.destroy();
      res.status(200).json('Success');
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}