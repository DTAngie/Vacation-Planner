const express = require('express');
const router = express.Router();
const vacationsCtrl = require('../../controllers/vacations');

router.post('/', vacationsCtrl.create);

module.exports = router