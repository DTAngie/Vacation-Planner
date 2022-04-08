const User = require('./user');
const Profile = require('./profile');
const Vacation = require('./vacation');
const ProfileVacation = require('./profilesVacations');
const Segment = require('./segment');
const Activity = require('./activity');

/*** Associations ***/
User.hasOne(Profile, {foreignKey: 'user_id'}); //TODO: test to make sure this works
Profile.belongsToMany(Vacation, {through: ProfileVacation, foreignKey: 'profileId'});
Vacation.belongsToMany(Profile, {through: ProfileVacation, foreignKey: 'vacationId'});
Vacation.hasMany(Segment, {foreignKey: 'vacation_id'});
Segment.belongsTo(Vacation, {foreignKey: 'vacation_id'});
Segment.hasMany(Activity, {foreignKey: 'segment_id'});
Activity.belongsTo(Segment, {foreignKey: 'segment_id'});

/*******/

let db = {};
db.User = User;
db.Profile = Profile;
db.Vacation = Vacation;
db.ProfileVacation = ProfileVacation;
db.Segment = Segment;
db.Activity = Activity;


module.exports = db;