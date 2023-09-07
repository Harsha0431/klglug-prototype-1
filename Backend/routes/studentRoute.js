const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentControl');

router.get('/' , controller.getAllStudentList );

router.post('/' , controller.addStudent ) ;

router.put('/:id', controller.updateStudent);

module.exports = router ;