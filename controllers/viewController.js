const Plan = require("../models/planModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync( async (req, res, next) => {
  const plans = await Plan.find({});
    res.render('overview', {
        title: 'Overview',
        plans
    });
})

exports.getPlan =  catchAsync (async(req, res, next) => {
  const plan = await Plan.findOne({slug: req.params.slug});
  res.render('plan', {
      title: `${plan.packageName} Plan`,
      plan
  });
});

exports.getLoginForm = catchAsync( async (req, res) => {
    res.render('login', {
        title: 'Login to your account'
    });
});