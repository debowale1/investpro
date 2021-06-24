const express = require('express');
const morgan = require('morgan');
const planRouter = require('./routes/planRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//body parser
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}


//MOUNTING ROUTES
app.use('/api/v1/plans', planRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;