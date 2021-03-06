const express = require('express');
const { getAllInvestments, createInvestment, getInvestment, updateInvestment, deleteInvestment, getMyInvestments, setPlanAndUserIds } = require('../controllers/investmentController');
const authController = require('../controllers/authController');


const router = express.Router({ mergeParams: true });

router.use(authController.protect);
// router.use(authController.grantAccessTo('admin', 'account-manager'));

//get current user investments
router.get('/myInvestments', getMyInvestments);

router.route('/').get(getAllInvestments).post(setPlanAndUserIds, createInvestment);
router.route('/:id').get(getInvestment).patch(updateInvestment).delete(deleteInvestment)

module.exports = router;