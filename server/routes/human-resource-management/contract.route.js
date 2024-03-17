const router = require('express').Router(); 
const {ContractController} = require('../../controller/human-resource-management')


// /human-resource-management/contract 

router.get('/get-contract/:employeeId',ContractController.getContract);
router.get('/get-my-contract',ContractController.getMyContract);
router.patch('/cancel-contract',ContractController.cancelContract);
router.post('/add-contract',ContractController.addContract);


module.exports = router