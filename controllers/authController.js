const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');


const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const signToken = id => {
  return jwt.sign({id}, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}

exports.signup = async(req, res, next) => {

  //chheck if no user exists with the emai
  const userExists = await User.findOne({ email: req.body.email});

  if(userExists) return next(res.status(401).json({status: 'fail', message: 'user already exists'}));
  //create new user
  const newUser = await User.create(req.body);


  //send token
  sendToken(newUser, 201, res);
}

exports.login = async(req, res, next) => {
  //check if email and password are provided
  const { email, password } = req.body;
  if(!email || !password) return next(res.status(400).json({status: 'error', message: 'Please provide email and password'}))
  //check if a user exists for that email and the pasword is correct
  const user = await User.findOne({email}).select('+password');
  if(!user || !(await user.comparePassword(password, user.password))) {
    return next(res.status(404).json({ status: 'error', message: 'email or password is not correct'}))
  }
  
  //send token
  sendToken(user, 200, res);
}
//protect middleware
exports.protect = async(req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  //decode the token
  const decoded = jwt.verify(token, JWT_SECRET);
  //get user belonging to that token
  const user = await User.findById(decoded.id);

  if(!user) return next(res.status(401).json({ status: 'error', message: 'user belonging to this token no longer exist'}))

  //everything OK
  req.user = user
  next();
}

exports.grantAccessTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(res.status(403).json({ status: 'error', message: 'You can not perform this action'}))
    }
    next();
  }
}

exports.updateMyPassword = async (req, res, next) => {

  const { passwordCurrent, password, passwordConfirm } = req.body;
  const user = await User.findById(req.user.id).select('+password');
  //check if the current password entered is correct
  if(!(await user.comparePassword(passwordCurrent, user.password))){
    return next(res.status(401).json({ status: 'error', message: 'the current password is incorrect'}))
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  //send token
  sendToken(user, 200, res);
}