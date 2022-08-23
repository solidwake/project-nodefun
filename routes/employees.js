const express = require('express');
const router = express.Router();
const employessController = require('../controllers/employeescontroller');

router.route('/')
    .get(employessController.getAllEmployees)
    .post(employessController.createNewEmployee)
    .put(employessController.updateEmployee)
    .delete(employessController.deleteEmployee);

router.route('/:id')
    .get(employessController.getEmployee);

module.exports = router;