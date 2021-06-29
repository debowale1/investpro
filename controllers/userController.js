const User = require('./../models/userModel');

exports.getAllUser = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  })
}

//creating a new user is handled by the authController

//put the id of the current user in req.params
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

const filterObj = (obj, ...fields ) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(fields.includes(el)) newObj[el] = obj[el];
  })
  return newObj;
}

//update current/logged in user
exports.updateMe = async (req, res, next) => {
  //check if the user wants to update their password
  if(req.body.password || req.body.passwordConfirm) {
    return next(res.status(403).json({ status: 'error', message: 'You cannot update password from this route. Please use /updateMyPassword'}));
  }
  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
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