const path = require('path');
const express = require('express');
const morgan = require('morgan');
const planRouter = require('./routes/planRoutes');
const userRouter = require('./routes/userRoutes');
const investmentRouter = require('./routes/investmentRoutes');
const viewRouter = require('./routes/viewRoutes');

const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1. Global Middlware
// Set secure http headers
app.use(helmet());

// Set up the logger
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

// rate limiting from the same IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later.'
});

app.use('/api',limiter);


//body parser
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());

//serving static files
app.use(express.static(path.join(__dirname, 'public')));






//test middleware
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});



//MOUNTING ROUTES
app.use('/api/v1/plans', planRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/investments', investmentRouter);
app.use('/', viewRouter);


module.exports = app;