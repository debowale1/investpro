const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = require('./app');

//connect to the database
const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PASS); 
mongoose.connect(DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => console.log('database connected successfully!'));



const PORT = process.env.PORT || 9005
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}...`);
});