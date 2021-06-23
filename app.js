const express = require('express');
const morgan = require('morgan');
const planRouter = require('./routes/planRoutes');

const app = express();

//body parser
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

// app.get('/api/v1/investments', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'welcome'
//   })
// })


//MOUNTING ROUTES
app.use('/api/v1/plans', planRouter);


module.exports = app;