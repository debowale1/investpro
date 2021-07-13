const Investment = require('../models/Investment');

exports.getAllInvestments = async (req, res, next) => {
  const investments = Investment.find();
  if(!investments) return next(res.status(404).json({message: 'No investments found'}));

  res.status(200).json({
    status: 'success',
    data: {
      data: investments,
  }
})
}
