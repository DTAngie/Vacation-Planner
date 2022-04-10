const { User, Vacation, Profile, Segment, Activity } = require("../models/index");

module.exports = {
  create,
  getVacationSegments,
  getOne,
  edit,
  getOneForEdit
}


async function create(req, res) {
  const profileId = req.user.profile.id;
  const { city, state, country, number } = req.body;
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
    console.log(vacation.profiles[0].profilesVacations.isOwner);
    //TODO: if no vacation returned from search, throw error. and replace the logic below.
    //Use below logic for show functions.
    // TODO:: check if owner before proceeding
  //TODO: confirm if double conditional works when non owners are added to the vacation
    if(vacation.profiles.some(profile => (profile.id === profileId) && (profile.profilesVacations.isOwner))) {
      const segment = await Segment.create({
        city: city,
        state: state,
        country: country,
        vacationId: vacation.id,
        number: number
      });
      res.json({segment});
    } else {
      res.status(400).json('Access Denied');
    }
  } catch (err) {
    console.log('err is', err)
    res.status(400).json(err)
  }
}
//TODO: this should just be, vacation GetOne
async function getVacationSegments(req, res){
  const profileId = req.user.profile.id;
  try {
    const vacation = await Vacation.findOne({where: {id: req.params.id}, include: Profile});
    if(vacation.profiles.some(profile => profile.id === profileId)) {
      const segments = await vacation.getSegments({order: ['number']});
      res.json(segments);
    } else {
      res.status(400).json('Access Denied');
    }
  } catch(err){
    res.status(400).json(err);
  }
}

async function getOne(req, res){
  const profileId = req.user.profile.id;
  try {
    const segment = await Segment.findOne({
      where: {
        id: req.params.segmentId
      }, 
      include: [
        {
          model: Vacation,
          required: true,
          include: [
            {
              model: Profile,
              required: true,
            }
          ]
        }, {
          model: Activity
        }
      ]
    });
    const profiles = segment.vacation.profiles;
    if(profiles.some(profile => profile.id === profileId)) {
      res.json(segment);
    } else {
      res.status(400).json('Access Denied');
    }
  } catch (err){
    console.log(err)
    res.status(400).json(err)
  }
}
//TODO: what is this used for?
async function edit(req, res){
  const profileId = req.user.profile.id;
  try {
    const segment = await Segment.findOne({
      where: {
        id: req.params.segmentId
      }, 
      include: [
        {
          model: Vacation,
          required: true,
          include: [
            {
              model: Profile,
              required: true,
            }
          ]
        }, {
          model: Activity,
          where: {
            id: req.params.activity.id
          }
        }
      ]
    });
    const profiles = segment.vacation.profiles;
    if(profiles.some(profile => profile.id === profileId)) {
      res.json(segment);
    } else {
      res.status(400).json('Access Denied');
    }
  } catch (err){
    console.log(err)
    res.status(400).json(err)
  }
}

async function getOneForEdit(req, res){
  const profileId = req.user.profile.id;
  try {
    const segment = await Segment.findOne({
      where: {
        id: req.params.segmentId
      }, 
      include: Vacation
    });

    const vacation = await Vacation.findByPk(req.params.id, {
      include: Profile
    })
  
    if(vacation.profiles.some(profile => (profile.id === profileId)  && (profile.profilesVacations.isOwner))) {
      res.json(segment);
    } else {
      res.status(400).json('Access Denied');
    }
  } catch (err){
    console.log(err)
    res.status(400).json(err)
  }
}