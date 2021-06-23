const mongoose = require('mongoose');

const {Schema} = mongoose;

const investmentSchema = new Schema({
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
  },
  currentDate: {
    type: Date,
    default: Date.now()
  },
  endDate: Date,
  periodsRemaining: Date,
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

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;