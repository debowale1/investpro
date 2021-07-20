const express = require('express');
const viewController = require('./../controllers/viewController');
const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/plan/:slug', viewController.getPlan);
router.get('/login', viewController.getLoginForm);


module.exports = router