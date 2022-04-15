const { Profile, Vacation, Activity, Segment } = require("../models/index");

module.exports = {
  create,
  edit,
  update,
  delete: deleteOne
}

async function create(req, res) {
  const { date, time, name, address, cost, ticketsPurchased } = req.body;
  try {
    const segment = await Segment.findByPk(req.params.segmentId);
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(segment.vacationId)) {
      const activity = await Activity.create({
        date: date,
        time: time,
        name: name,
        address: address,
        cost: cost ? parseInt(cost) : 0,
        ticketsPurchased: ticketsPurchased,
        segmentId: segment.id
      });
      if(parseInt(activity.cost) !== 0){
        segment.cost = parseInt(segment.cost) + parseInt(activity.cost);
        await segment.save()
      }
      res.status(200).json('Success');
    } else {
      res.status(401).json();
    }
  } catch(err) {
    console.log(err)
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
    } else {
      res.status(401).json();
    }
  } catch(err) { 
    res.status(400).json();
  }
}

async function update(req, res) {
  try {
    const activity = await Activity.findByPk(req.params.activityId, {include: Segment});
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(activity.segment.vacationId)) {
      const prevCost = parseInt(activity.cost);
      await activity.update(req.body);
      await activity.save()
      if(parseInt(req.body.cost) !== prevCost) {
        activity.segment.cost = (parseInt(activity.cost) - prevCost) + parseInt(activity.segment.cost);
        await activity.segment.save();
      }
      res.status(200).json('Success');
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}

async function deleteOne(req, res) {
  try {
    const activity = await Activity.findByPk(req.params.activityId, {include: Segment});
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(activity.segment.vacationId)) {
      const prevCost = parseInt(activity.cost);
      const prevSegmentId = activity.segmentId;
      await activity.destroy();
      if(prevCost !== 0) {
        const segment = await Segment.findByPk(prevSegmentId);
        segment.cost = parseInt(segment.cost) - prevCost;
        await segment.save();
      }
      res.status(200).json('Success');
    } else {
      res.status(401).json();
    }
  } catch(err) {
    res.status(400).json();
  }
}