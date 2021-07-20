const path = require('path');
const express = require('express');
const morgan = require('morgan');
const planRouter = require('./routes/planRoutes');
const userRouter = require('./routes/userRoutes');
const investmentRouter = require('./routes/investmentRoutes');

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
app.get('/', (req, res) => { 
  res.status(200).render('base', { plan: 'Quarterly', user: 'Susan' });
});
app.get('/overview', (req, res) => { 
  res.status(200).render('overview', { title: 'All Plans' });
});
app.get('/plan', (req, res) => { 
  res.status(200).render('plan', { title: 'Yearly Plan' });
});
app.use('/api/v1/plans', planRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/investments', investmentRouter);


module.exports = app;