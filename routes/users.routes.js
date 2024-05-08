const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/user/logged', usersController.userLogged);
router.get('/user/no-permission', usersController.noPermission);

module.exports = router;
