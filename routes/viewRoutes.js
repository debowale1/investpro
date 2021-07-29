const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const router = express.Router();



router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/plan/:slug', viewController.getPlan);
router.get('/login', viewController.getLoginForm);


module.exports = router