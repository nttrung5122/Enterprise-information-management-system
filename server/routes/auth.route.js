const router = require('express').Router(); 
const authController = require('../controller/auth.controller');

// /auth
router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);

module.exports = router;