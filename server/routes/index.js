const router = require('express').Router(); 
const auth = require('./auth.route')
const humanResourceManagement = require('./human-resource-management')
const test  = require('../controller/test.controller')
const test2  = require('../controller/test2.controller')

router.get('/test',test.test)
router.get('/test2',test2.test)
router.use('/auth', auth);
router.use('/human-resource-management', humanResourceManagement);

module.exports = router;