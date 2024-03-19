const router = require('express').Router(); 
const {AccountController} = require('../../controller/human-resource-management')


// /human-resource-management/account
// cần bàn lại
router.post('/disable-account',AccountController.disableAccount);
router.post('/enable-account',AccountController.enableAccount);
router.post('/change-password-for-manager',AccountController.changePasswordForManager)
router.get('/', AccountController.getAllAccounts)
module.exports = router