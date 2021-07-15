const express = require('express');
const { getAllInvestments, createInvestment } = require('../controllers/investmentController');
const authController = require('../controllers/authController');


const router = express.Router({ mergeParams: true });

router.use(authController.protect);
// router.use(authController.grantAccessTo('admin', 'account-manager'));

router.route('/').get(getAllInvestments).post(createInvestment);

module.exports = router;