const Plan = require("../models/planModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync( async (req, res) => {
  const plans = await Plan.find({});
    res.render('overview', {
        title: 'Overview',
        plans
    });
})

exports.getPlan = (req, res) => {
    res.render('plan', {
        title: 'Plan',
        user: req.user
    });
}