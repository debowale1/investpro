const Investment = require('../models/investmentModel');
const catchAsync = require('./../utils/catchAsync');
const { getOne, updateOne, deleteOne } = require('./factoryHandler');

exports.getAllInvestments = catchAsync (async (req, res, next) => {
  let filter = {};
  if (req.params.planId) filter.plan = req.params.planId;
  if (req.params.userId) filter.user = req.params.userId;

  const investments = await Investment.find(filter);
  
  if(!investments) return next(res.status(404).json({message: 'No investments found'}));

  res.status(200).json({
    status: 'success',
    results: investments.length,
    data: {
        data: investments,
    }
  })
})

exports.setPlanAndUserIds = (req, res, next) => {
  if(!req.body.plan) req.body.plan = req.params.planId;
  if(!req.body.user) req.body.user = req.user.id;
  next();
}

exports.createInvestment = catchAsync (async (req, res, next) => {
  
  const investment = await Investment.create(req.body);
  if(!investment) return next(res.status(400).json({message: 'Investment not created'}));
  res.status(200).json({
    status: 'success',
    data: {
        data: investment,
    }
  });
});

exports.getInvestment = getOne(Investment);
exports.updateInvestment = updateOne(Investment);
exports.deleteInvestment = deleteOne(Investment);
