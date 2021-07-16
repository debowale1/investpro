const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
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
    select: false
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
  active: {
    type: Boolean,
    default: true,
  }
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});


//DOCUMENT MIDDLEWARE
//hash user password before save
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  // dont save passwordConfirm
  this.passwordConfirm = undefined;

  next();
});

//QUERY MIDDLEWARE
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false }})
  next();
})

//virtual populate
userSchema.virtual('investments', {
  ref: 'Investment',
  localField: '_id',
  foreignField: 'user'
})

//INSTANCE METHODS
userSchema.methods.comparePassword = async function(enteredPassword, dbPassword){
  return await bcrypt.compare(enteredPassword, dbPassword);
}

//VIRTUALS
userSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`;
})

//Indexes
userSchema.index({ role: 1 })

const User = mongoose.model('User', userSchema);
module.exports = User;