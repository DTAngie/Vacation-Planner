const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../../controllers/activities');

router.get('/:id/segments/:segmentId/activities/:activityId/edit', activitiesCtrl.edit);
router.post('/:id/segments/:segmentId/activities/', activitiesCtrl.create);
router.post('/:id/segments/:segmentId/activities/:activityId', activitiesCtrl.update);

module.exports = router;