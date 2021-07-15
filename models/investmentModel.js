const mongoose = require('mongoose');

const {Schema} = mongoose;

const investmentSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: 'Plan',
    required: [true, 'Booking must belong to a plan']
  },
  amountInvested:{
    type: Number,
  },
  expectedROI: Number,
  modeOfPayment: {
    type: String,
    enum: ['Transfer', 'Web Payment']
  },
  startDate: {
    type: Date,
    required: [true, 'An investment must have a start date'],
    default: Date.now()
  },
  endDate: {
    type: Date,
    default: function() {
      return new Date(this.startDate.getTime() +  1000 * 60 * 60 * 24 * 91);
    }
  },
  periodsRemaining: {
    type: Number,
    default: function() {
      return (this.endDate.getTime() - Date.now() ); // in milliseconds
    }
  },
  status: {
    type: String,
    enum: ['Not Started','Running', 'Ended'],
    default: 'Not Started'
  },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
//virtual methods
investmentSchema.virtual('daysRemaining').get(function() {
  return (this.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
});

//query middleware
investmentSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select: 'firstName lastName'
  }).populate({
    path: 'plan', 
    select: 'packageName percentageROI'
  });
  next();
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;