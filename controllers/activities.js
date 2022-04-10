const { Profile, Vacation, Activity, Segment } = require("../models/index");

module.exports = {
  create,
  edit
}


async function create(req, res){
  const profileId = req.user.profile.id;
  const { date, time, name, address, cost, ticketsPurchased } = req.body;

  try {
    const vacation = await Vacation.findOne({
      where: {id: req.params.id}, 
      include: [
        {
          model: Profile, 
          through: {isOwner: true}
        }
      ]
    });
    //TODO: if no vacation returned from search, throw error. and replace the logic below.
      //Use below logic for show functions.
      // TODO:: check if owner before proceeding
    //TODO: confirm if double conditional works when non owners are added to the vacation
    if(vacation.profiles.some(profile => (profile.id === profileId) && (profile.profilesVacations.isOwner))) {
      const activity = await Activity.create({
        date: date,
        time: time,
        name: name,
        address: address,
        cost: cost,
        ticketsPurchased: ticketsPurchased,
        segmentId: req.params.segmentId
      });
      res.json({activity});
    } else {
      res.status(400).json('Access Denied');
    }
  } catch (err){
    res.status(400).json(err);
  }
}

async function edit(req, res) {
  const profileId = req.user.profile.id;
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

    const vacation = await Vacation.findByPk(activity.segment.vacation.id,
      {
        include: [
          {
            model: Profile, 
            through: {isOwner: true}
          }
        ]
      }
    );
    if(vacation.profiles.some(profile => (profile.id === profileId) && (profile.profilesVacations.isOwner))) {
      res.json({activity})
    } else {
      res.status(400).json('Access Denied');
    }

    console.log(activity)
  } catch(err){
    res.status(400).json(err);
  }

}