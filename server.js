const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');
const { handleError, convertToApiError } = require('./middleware/apiErros');

// MongoDB
const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(xss());
app.use(mongoSanitize());

// Passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Routes
app.use('/api', routes);

// Error handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') console.error(err.stack);
    handleError(err, res);
});

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});