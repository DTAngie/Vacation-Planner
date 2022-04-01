const express = require('express');
const router = express.Router();
const vacationsCtrl = require('../../controllers/vacations');

router.post('/', vacationsCtrl.create);
router.get('/:id', vacationsCtrl.getVacationsByUser);

module.exports = router