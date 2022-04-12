const { Profile, Vacation, Activity, Segment } = require("../models/index");

module.exports = {
  create,
  edit,
  update,
  delete: deleteOne
}

async function create(req, res){
  const { date, time, name, address, cost, ticketsPurchased } = req.body;
  try {
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(req.params.id)) {
      const activity = await Activity.create({
        date: date,
        time: time,
        name: name,
        address: address,
        cost: cost,
        ticketsPurchased: ticketsPurchased,
        segmentId: req.params.segmentId
      });
      res.status(200).json('Success');
    } else {
      res.status(401).json();
    }
  } catch (err){
    res.status(400).json();
  }
}

async function edit(req, res) {
  try {
    const activity = await Activity.findByPk(req.params.activityId,
      {
        include: [{
          model: Segment,
          required: true,
          include: [{
            model: Vacation,
            required: true
          }]
        }]
      }
    );
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(activity.segment.vacation.id)) {
      res.json({activity});
    } else{
      res.status(401).json();
    }
  } catch(err){
    res.status(400).json();
  }
}

async function update(req, res) {
  try {
    const activity = await Activity.findByPk(req.params.activityId,
      {
        include: [{
          model: Segment,
          required: true,
          include: [{
            model: Vacation,
            required: true
          }]
        }]
      }
    );
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(activity.segment.vacation.id)) {
      await activity.update(req.body);
      await activity.save()
      res.status(200).json('Success');
    } else {
      res.status(401).json();
    }
  } catch(err){
    res.status(400).json();
  }
}

async function deleteOne(req, res) {
  try {
    const activity = await Activity.findByPk(req.params.activityId,
      {
        include: [{
          model: Segment,
          required: true,
          include: [{
            model: Vacation,
            required: true
          }]
        }]
      }
    );
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(activity.segment.vacation.id)) {
      await activity.destroy();
      res.status(200).json('Success');
    } else{
      res.status(401).json();
    }
  } catch(err){
    res.status(400).json();
  }
}