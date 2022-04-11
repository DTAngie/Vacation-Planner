const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../../controllers/activities');

router.get('/:id/segments/:segmentId/activities/:activityId/edit', activitiesCtrl.edit);
router.post('/:id/segments/:segmentId/activities/', activitiesCtrl.create);
router.put('/:id/segments/:segmentId/activities/:activityId', activitiesCtrl.update);
router.delete('/:id/segments/:segmentId/activities/:activityId', activitiesCtrl.delete);

module.exports = router;