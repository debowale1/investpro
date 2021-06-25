const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch('/updateMyPassword', authController.protect, authController.updateMyPassword)

router.route('/')
      .get(
            authController.protect, 
            authController.grantAccessTo('admin'), 
            userController.getAllUser
            )
      // .post(userController.createUser)
router.route('/:id')
//       .get(userController.getUser)
//       .patch(userController.updateUser)
//       .delete(userController.deleteUser);

module.exports = router;