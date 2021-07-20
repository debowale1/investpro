const mongoose = require('mongoose');
const slugify = require('slugify');
// const {Schema} = mongoose;

const planSchema = new mongoose.Schema({
  packageName: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Biannually', 'Yearly', 'Test'],
    required: [true, 'Plan must have a package name'],
  },
  summary:{
    type: String,
    trim: true,
    required: [true, 'Plan must have a summary'],
  },
  description:{
    type: String,
    trim: true,
  },
  numOfDays: {
    type: Number,
    required: [true, 'Plan must have a number of days'],
  },
  percentageROI: {
    type: Number,
    required: [true, 'A plan must have a ROI percentage']
  },
  slug: String,
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

planSchema.pre('save', function(next) {
  this.slug = slugify(this.packageName, {lower: true})
  next();
});

//virtual populates
planSchema.virtual('investments', {
  ref: 'Investment',
  localField: '_id',
  foreignField: 'plan',
});


const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;