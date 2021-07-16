const express = require('express');
const planController = require('./../controllers/planController');
const authController = require('./../controllers/authController');
const investmentRouter = require('./investmentRoutes');

const router = express.Router();

//Nested routes
// POST /899wbhfj/investments
// GET /899wbhfj/investments
// GET /899wbhfj/investments/hsbdajbah9936

router.use('/:planId/investments', investmentRouter);

router.route('/')
      .get(
            planController.getAllPlans
      )
      .post(
            authController.protect, 
            authController.grantAccessTo('admin'),
            planController.createPlan
      );
      
router.route('/:id')
      .get(planController.getPlan)
      .patch(
            authController.protect, 
            authController.grantAccessTo('admin'),
            planController.updatePlan
      )
      .delete(
            authController.protect, 
            authController.grantAccessTo('admin'),
            planController.deletePlan
      );

module.exports = router;