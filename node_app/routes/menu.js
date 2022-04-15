var express = require('express');
const { menuController } = require('../controller/menuController');
const { menuControllerPost } = require('../controller/menuControllerPost');
var router = express.Router();

/* GET users listing. */
router.get('/', menuController);
router.post('/', menuControllerPost);

module.exports = router;
