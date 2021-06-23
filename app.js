const express = require('express')


const app = express();

app.get('/api/v1/investments', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'welcome'
  })
})


module.exports = app;