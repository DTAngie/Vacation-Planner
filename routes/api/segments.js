const express = require('express');
const router = express.Router();
const segmentsCtrl = require('../../controllers/segments');

router.post('/:id/segments', segmentsCtrl.create);

module.exports = router;