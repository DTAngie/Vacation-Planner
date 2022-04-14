const express = require('express');
const router = express.Router();
const segmentsCtrl = require('../../controllers/segments');
const isLoggedIn = require('../../middleware/auth');

router.get('/:id/segments/:segmentId/edit', isLoggedIn, segmentsCtrl.edit);
router.get('/:id/segments/:segmentId/activity', isLoggedIn, segmentsCtrl.getOneForEdit)
router.get('/:id/segments/:segmentId', isLoggedIn, segmentsCtrl.getOne);
router.post('/:id/segments', isLoggedIn, segmentsCtrl.create);
router.put('/:id/segments/:segmentId', isLoggedIn, segmentsCtrl.update);
router.delete('/:id/segments/:segmentId', isLoggedIn, segmentsCtrl.delete)

module.exports = router;