const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// give it to the controller, no need to pass params because of express
router.post('/signup', userController.createUser);

router.post('/login', userController.userLogin);

module.exports = router;