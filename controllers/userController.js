const User = require('./../models/userModel');

const filterObj = (obj, ...fields ) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(fields.includes(el)) newObj[el] = obj[el];
  })
  return newObj;
}

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
//admin get user
exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('investments');
  console.log(user);
  res.status(200).json({
    status: 'success',
    data: {
      user: user
    }
  });
}

//creating a new user is handled by the authController
exports.createUser = (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Please use the /signup route to create a user'
  })
}

//admin update user
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })

  if(!updatedUser) return next(res.status(404).json({ status: 'error', message: 'user not found'}));

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
}

//admin delete user
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if(!deletedUser) return next(res.status(404).json({ status: 'error', message: 'user not found'}));

  res.status(204).json({
    status: 'success',
    data: {
      user: null
    }
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