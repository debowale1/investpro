const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);


//only logged in user can access these routes
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updateMyPassword)

router.patch('/updateMe', userController.updateMe)


//only admin can access this routes
router.use(authController.grantAccessTo('admin'))
router.route('/')
      .get(
            authController.protect, 
            userController.getAllUser
            )
      // .post(userController.createUser)
router.route('/:id')
//       .get(userController.getUser)
//       .patch(userController.updateUser)
//       .delete(userController.deleteUser);

module.exports = router;