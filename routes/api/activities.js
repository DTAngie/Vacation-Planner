const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../../controllers/activities');
const isLoggedIn = require('../../middleware/auth');

router.get('/:id/segments/:segmentId/activities/:activityId/edit', isLoggedIn, activitiesCtrl.edit);
router.post('/:id/segments/:segmentId/activities/', isLoggedIn, activitiesCtrl.create);
router.put('/:id/segments/:segmentId/activities/:activityId', isLoggedIn, activitiesCtrl.update);
router.delete('/:id/segments/:segmentId/activities/:activityId', isLoggedIn, activitiesCtrl.delete);

module.exports = router;