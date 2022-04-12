const { User, Vacation, Profile, Segment, Activity } = require("../models/index");

module.exports = {
  create,
  getVacationSegments,
  getOne,
  edit,
  update,
  getOneForEdit
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
        vacationId: req.params.id
      });
      res.json({segmentId: segment.id});
    } else {
      res.status(401).json();
    }
  } catch (err) {
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
  } catch(err){
    res.status(400).json();
  }
}

async function update(req, res) {
  try {
    const segment = await Segment.findByPk(req.params.segmentId, { include: Vacation});
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(segment.vacation.id)) {
      await segment.update(req.body);
      await segment.save()
      res.json({segmentId: segment.id});
    } else{
      res.status(401).json();
    }
  } catch(err){
    res.status(400).json();
  }
}

//TODO: this should just be, vacation GetOne
async function getVacationSegments(req, res){
  const profileId = req.user.profile.id;
  try {
    const vacation = await Vacation.findOne({where: {id: req.params.id}, include: Profile});
    if(vacation.profiles.some(profile => profile.id === profileId)) {
      const segments = await vacation.getSegments({order: ['number']});
      console.log(segments)
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
    const segment = await Segment.findByPk(req.params.segmentId, { 
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
      ],
      order: [
        [Activity, 'date']
      ]
    });
    const profile = await Profile.findByPk(req.user.profile.id, {include: Vacation});
    if(profile.isVacationOwner(segment.vacation.id)) {
      res.json(segment);
    } else {
      res.status(401).json();
    }
  } catch (err){
    res.status(400).json();
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