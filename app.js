const express = require('express')


const app = express();

app.get('/api/v1/plans', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'welcome'
  })
})


const port = 9005
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});