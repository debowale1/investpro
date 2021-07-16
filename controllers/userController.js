const User = require('./../models/userModel');
const { getAll, updateOne, deleteOne, getOne } = require('./factoryHandler');

const filterObj = (obj, ...fields ) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(fields.includes(el)) newObj[el] = obj[el];
  })
  return newObj;
}

exports.getAllUser = getAll(User);
//admin update user
exports.updateUser = updateOne(User);
//admin delete user
exports.deleteUser = deleteOne(User);
//admin get user
exports.getUser = getOne(User);

//creating a new user is handled by the authController
exports.createUser = (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Please use the /signup route to create a user'
  })
}


//put the id of the current user in req.params
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

//update current/logged in user details
exports.updateMe = async (req, res, next) => {
  //check if the user wants to update their password
  if(req.body.password || req.body.passwordConfirm) {
    return next(res.status(403).json({ status: 'error', message: 'You cannot update password from this route. Please use /updateMyPassword'}));
  }
  const filteredReq = filterObj(req.body, 'firstName', 'lastName', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredReq, {
    new: true,
    runValidators: true,
  });


  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
}

//current user deactivate account
exports.deleteMe = async (req, res, next) => {
  
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: {
      user: null
    }
  })
}