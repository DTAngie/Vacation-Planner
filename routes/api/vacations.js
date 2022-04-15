const express = require('express');
const router = express.Router();
const vacationsCtrl = require('../../controllers/vacations');
const isLoggedIn = require('../../middleware/auth');

router.get('/',isLoggedIn, vacationsCtrl.getVacationsByUser);
router.get('/:id/edit', isLoggedIn, vacationsCtrl.edit);
router.get('/:id/segment', isLoggedIn, vacationsCtrl.getOneForEdit);
router.get('/:id', isLoggedIn, vacationsCtrl.getOne);
router.post('/', isLoggedIn, vacationsCtrl.create);
router.post('/:id/addFriend', isLoggedIn, vacationsCtrl.addFriend);
router.put('/:id', isLoggedIn, vacationsCtrl.update);
router.delete('/:id', isLoggedIn, vacationsCtrl.delete);

module.exports = router