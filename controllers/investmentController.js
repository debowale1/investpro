const Investment = require('../models/investmentModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllInvestments = catchAsync (async (req, res, next) => {
  const investments = await Investment.find();
  if(!investments) return next(res.status(404).json({message: 'No investments found'}));

  res.status(200).json({
    status: 'success',
    data: {
        data: investments,
    }
  })
})

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
