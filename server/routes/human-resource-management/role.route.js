const router = require('express').Router(); 

const {RoleController} = require('../../controller/human-resource-management')

// /human-resource-management/role 
router.get('/:id',RoleController.getRole);
router.get('/',RoleController.getAllRole);
router.post('/',RoleController.addRole);
router.patch('/',RoleController.updateRole);
router.delete('/:id',RoleController.removeRole);

module.exports = router