const express = require('express');
const router = express.Router();
const employessController = require('../../controllers/employeescontroller');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyroles');


router.route('/')
    .get(employessController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employessController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employessController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employessController.deleteEmployee);

router.route('/:id')
    .get(employessController.getEmployee);

module.exports = router