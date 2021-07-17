const { request } = require('express');
const Investment = require('../models/investmentModel');
const Plan = require('../models/planModel');
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

  //get plan 
  const plan = await Plan.findById(req.body.plan);
  if(!plan) return next(res.status(404).json({message: 'Plan not found'}));

  const requestBody = {  
    ...req.body,
    expectedROI: (plan.percentageROI / 100) * req.body.amountInvested,
  }
  
  const investment = await Investment.create(requestBody);
  if(!investment) return next(res.status(400).json({message: 'Investment not created'}));
  res.status(200).json({
    status: 'success',
    data: {
        data: investment,
    }
  });
});

//get current user investments
exports.getMyInvestments = catchAsync (async (req, res, next) => {
  const filter = { user: req.user.id };
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


exports.getInvestment = getOne(Investment);
exports.updateInvestment = updateOne(Investment);
exports.deleteInvestment = deleteOne(Investment);
