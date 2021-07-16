const catchAsync = require("../utils/catchAsync");

exports.getAll = Model => catchAsync(async(req, res, next) => {
  console.log(req.query)

  const queryObj = {...req.query};

  const excludedFields = ['fields', 'sort', 'limit', 'page'];
  excludedFields.forEach(el => delete queryObj[el]);

  let query = Model.find(queryObj);

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
  const doc = await query;
  res.status(200).json({
    status: 'success',
    result: doc.length,
    data:{
      data: doc
    }
  });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const doc = await Model.findByIdAndDelete(id);

  if(!doc) return next(res.status(404).json({ status: 'error', message: 'document not deleted'}));

  res.status(204).json({
    status: 'success',
    data: {
      data: null
    }
  })
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const doc = await Model.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

  if(!doc) return next(res.status(404).json({ status: 'error', message: 'document not updated'}));

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  })
});

exports.getOne = (Model, populateOption) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);
  
  if(populateOption){
    query = query.populate(populateOption);
  }
  const doc = await query;
  if(!doc) return next(res.status(404).json({ status: 'error', message: 'document not found'}));

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  })
});

exports.createOne = Model => catchAsync(async (req, res, next) => {

  const doc = await Model.create(req.body);

  if(!doc) return next(res.status(400).json({ status: 'error', message: 'error creating new document'}));

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  })
});


