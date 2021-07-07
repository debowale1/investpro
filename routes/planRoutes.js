const express = require('express');
const planController = require('./../controllers/planController');
const authController = require('./../controllers/authController');

const router = express.Router();



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