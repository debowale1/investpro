const Plan = require('./../models/planModel');

exports.getAllPlans = async(req, res, next) => {
  const plans = await Plan.find();
  res.status(200).json({
    status: 'success',
    data:{
      plans
    }
  });
};

exports.createPlan = async (req, res, next) => {
  const { packageName, description, percentageROI } = req.body;

  const newPlan = await Plan.create({
    packageName,
    description,
    percentageROI
  });

  // if(!newPlan) return next(res.status(400).json({ status: 'error', message: 'error creating new plan'}));

  res.status(201).json({
    status: 'success',
    data: {
      plan: newPlan
    }
  })
}