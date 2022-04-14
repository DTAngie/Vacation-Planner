const express = require('express');
const router = express.Router();
const vacationsCtrl = require('../../controllers/vacations');

router.get('/', vacationsCtrl.getVacationsByUser);
router.get('/:id/edit', vacationsCtrl.edit);
router.get('/:id/segment', vacationsCtrl.getOneForEdit);
router.get('/:id', vacationsCtrl.getOne);
router.post('/', vacationsCtrl.create);

module.exports = router