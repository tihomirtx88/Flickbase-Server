const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

require('dotenv').config();
const app = express();

const routes = require('./routes');

const { handleError, convertToApiError } = require('./middleware/apiErros');

const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);

//parsing 
app.use(bodyParser.json());

//Sanitize
app.use(xss());
app.use(mongoSanitize());

// Routes
app.use('/api', routes);

// ERROR HANDLING 
app.use(convertToApiError);
app.use((err, req, res, next) => {
    handleError(err, res);
});

const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log('Server listen on port 3001')
});