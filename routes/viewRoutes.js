const express = require('express');
const viewController = require('./../controllers/viewController');
const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/plan', viewController.getPlan);


module.exports = router