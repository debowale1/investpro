const Plan = require('./../models/planModel');

exports.getAllPlans = async(req, res, next) => {
  console.log(req.query)

  const queryObj = {...req.query};

  const excludedFields = ['fields', 'sort', 'limit', 'page'];
  excludedFields.forEach(el => delete queryObj[el]);

  let query = Plan.find(queryObj);

  //sort
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query.sort(sortBy)
  } else {
    query.sort('createdAt')
  }

  //fields selection
  if(req.query.fields){
    const fields = req.query.fields.split(',').join(' ');
    query.select(fields);
  }else{
    query.select('-__v')
  }
  
  //pagination
  if(req.query.page || req.query.limit){
    const limit = +req.query.limit || 100;
    const page = +req.query.page || 1;
    const skip = limit * (page - 1);
    query.skip(skip).limit(limit);
  }
  //send query
  const plans = await query;
  res.status(200).json({
    status: 'success',
    result: plans.length,
    data:{
      plans
    }
  });
};

exports.getPlan = async (req, res, next) => {
  const { id } = req.params;

  const plan = await Plan.findById(id).populate('investments');

  if(!plan) return next(res.status(404).json({ status: 'error', message: 'No plan with this ID'}));
  res.status(200).json({
    status: 'success',
    data:{
      plan
    }
  });
}

exports.createPlan = async (req, res, next) => {
  const { packageName, description, percentageROI } = req.body;

  const newPlan = await Plan.create({
    packageName,
    description,
    percentageROI
  });

  if(!newPlan) return next(res.status(400).json({ status: 'error', message: 'error creating new plan'}));

  res.status(201).json({
    status: 'success',
    data: {
      plan: newPlan
    }
  })
}

exports.updatePlan = async(req, res, next) => {
  const { id } = req.params;

  const updatedPlan = await Plan.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    status: 'success',
    data: {
      plan: updatedPlan
    }
  })
}

exports.deletePlan = async(req, res, next) => {
  const { id } = req.params;

  await Plan.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: {
      plan: null
    }
  })
}