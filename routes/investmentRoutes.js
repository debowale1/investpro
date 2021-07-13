const express = require('express');
const { getAllInvestments } = require('../controllers/investmentController');
const router = express.Router();

router.route('/').get(getAllInvestments)

module.exports = router;