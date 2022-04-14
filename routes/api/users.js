const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const isLoggedIn = require('../../middleware/auth');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.put('/:id', isLoggedIn, usersCtrl.update);

module.exports = router;