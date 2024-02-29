const router = require('express').Router(); 
const auth = require('./auth.route')
const humanResourceManagement = require('./human-resource-management')


router.use('/auth', auth);
router.use('/human-resource-management', humanResourceManagement);

module.exports = router;