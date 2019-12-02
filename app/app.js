const express = require('express');
const errorMW = require('./middlewares/error');
const logger = require('./logger/logger');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const app = express();

dotenv.config();

const indexRoutes = require('./routes/index')

app.set('port', process.env.PORT);

app.use(express.urlencoded({ extended: false }))

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ 
  extended: true
})); 

app.use('/', indexRoutes);
app.use(errorMW.handle);

app.listen(app.get('port'), () => {
    logger.info(`server on port ${app.get('port')}`);
});

module.exports = app;