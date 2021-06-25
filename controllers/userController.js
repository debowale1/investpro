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