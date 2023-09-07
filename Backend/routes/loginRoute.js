const express = require('express');
const router = express.Router();

const controller = require('../controllers/loginControl');

router.post('/' , controller.getLoginStatus);

module.exports = router;

