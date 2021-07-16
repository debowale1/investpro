const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const InvestmentRouter = require('./investmentRoutes');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
//TODO
//forgotpassword
//send token to update forgotten password 


//only logged in user can access these routes
router.use(authController.protect);

router.use('/:userId/investments', InvestmentRouter);

router.patch('/updateMyPassword', authController.updateMyPassword)
router.patch('/updateMe', userController.updateMe)

router.get('/myDetails', userController.getMe, userController.getUser);
//delete current user
router.delete('/deleteMe', userController.deleteMe)


//only admin can access this routes
router.use(authController.grantAccessTo('admin'))
router.route('/')
      .get(userController.getAllUser)
      .post(userController.createUser)
router.route('/:id')
      .get(userController.getUser)
      .patch(userController.updateUser)
      .delete(userController.deleteUser);

module.exports = router;