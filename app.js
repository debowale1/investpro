const path = require('path');
const express = require('express');
const morgan = require('morgan');
const planRouter = require('./routes/planRoutes');
const userRouter = require('./routes/userRoutes');
const investmentRouter = require('./routes/investmentRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1. Global Middlware
//serving static files
app.use(express.static(path.join(__dirname, 'public')));



//body parser
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}



//MOUNTING ROUTES
app.use('/api/v1/plans', planRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/investments', investmentRouter);
app.use('/', viewRouter);


module.exports = app;