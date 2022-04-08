const { Profile, Vacation, Activity } = require("../models/index");

module.exports = {
  create
}


async function create(req, res){
  console.log('made it here')
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
  console.log('req params', req.params.id);
  console.log(vacation)
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
      console.log('activity is')
      console.log(activity)
      res.json({activity});
    } else {
      console.log('this was not accessible');
      res.status(400).json('Access Denied');
    }
  } catch (err){
    console.log('err is', err)
    res.status(400).json(err);
  }

}