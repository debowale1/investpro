const mongoose = require('mongoose');
// const {Schema} = mongoose;

const planSchema = new mongoose.Schema({
  packageName: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Biannually', 'Yearly', 'Test'],
    required: [true, 'Plan must have a package name'],
  },
  description:{
    type: String,
    trim: true,
    required: [true, 'Please provide a brief description']
  },
  percentageROI: {
    type: Number,
    required: [true, 'A plan must have a ROI percentage']
  },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;