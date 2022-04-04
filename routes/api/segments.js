const express = require('express');
const router = express.Router();
const segmentsCtrl = require('../../controllers/segments');

router.get('/:id/segments', segmentsCtrl.getVacationSegments);
router.post('/:id/segments', segmentsCtrl.create);

module.exports = router;