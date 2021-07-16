const Plan = require('./../models/planModel');
const factory = require('./factoryHandler');





exports.createPlan = factory.createOne(Plan);
exports.getAllPlans = factory.getAll(Plan);
exports.getPlan = factory.getOne(Plan, {path: 'investments'});
exports.updatePlan = factory.updateOne(Plan);
exports.deletePlan = factory.deleteOne(Plan);
