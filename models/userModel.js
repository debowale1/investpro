const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please provide your firstname"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "please provide your lastname"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    trim: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'account-manager', 'admin'],
      message: "role can only be either user, account manager, or admin"
    },
    default: 'user'
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a confirmation password'],
    validate: {
      validator: function(el){
        return el === this.password
      },
      message: "password and confirmation must match",
    }
  },
  gender:{
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Please specify your gender']
  },
  address: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: String,
  },
  phone: {
    type: String,
  },
  photo: String,
  accountNumber: String,
  bankName: String,
  nokFullname: {
    type: String,
    trim: true
  },
  nokAddress: {
    type: String,
    trim: true
  },
  nokPhone: {
    type: String,
    trim: true
  },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;