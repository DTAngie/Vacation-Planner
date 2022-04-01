const express = require('express');
const router = express.Router();
const vacationsCtrl = require('../../controllers/vacations');

router.post('/', vacationsCtrl.create);
router.get('/', vacationsCtrl.getVacationsByUser);
router.get('/:id', vacationsCtrl.getOne);

module.exports = router