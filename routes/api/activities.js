const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../../controllers/activities');

router.post('/:id/segments/:segmentId/activities/', activitiesCtrl.create);

module.exports = router;