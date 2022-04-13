const express = require('express');
const router = express.Router();
const segmentsCtrl = require('../../controllers/segments');

router.get('/:id/segments/:segmentId/edit', segmentsCtrl.edit);
router.get('/:id/segments/:segmentId/activity', segmentsCtrl.getOneForEdit)
router.get('/:id/segments/:segmentId', segmentsCtrl.getOne);
router.post('/:id/segments', segmentsCtrl.create);
router.put('/:id/segments/:segmentId', segmentsCtrl.update);
router.delete('/:id/segments/:segmentId', segmentsCtrl.delete)

module.exports = router;