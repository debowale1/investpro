const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');


const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

exports.signup = async(req, res, next) => {

  //chheck if no user exists with the emai
  const userExists = await User.findOne({ email: req.body.email});

  if(userExists) return next(res.status(401).json({status: 'fail', message: 'user already exists'}));
  //create new user
  const newUser = await User.create(req.body);
  //sign token
  const token = jwt.sign({id: newUser._id}, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  })
}