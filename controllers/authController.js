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

exports.login = async(req, res, next) => {
  //check if email and password are provided
  const { email, password } = req.body;
  if(!email || !password) return next(res.status(400).json({status: 'error', message: 'Please provide email and password'}))
  //check if a user exists for that email and the pasword is correct
  const user = await User.findOne({email}).select('+password');
  if(!user || !(await user.comparePassword(password, user.password))) {
    return next(res.status(404).json({ status: 'error', message: 'email or password is not correct'}))
  }
  //sign token
  const token = jwt.sign({id: user._id}, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    token
  });
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