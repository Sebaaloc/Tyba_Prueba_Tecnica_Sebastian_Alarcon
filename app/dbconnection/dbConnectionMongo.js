const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_ROUTE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

module.exports = mongoose;