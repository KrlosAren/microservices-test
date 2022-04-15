var express = require('express');
const { indexController } = require('../controller/apiController');
var router = express.Router();

/* GET users listing. */
router.post('/', indexController);

router.get('/', indexController);

module.exports = router;
