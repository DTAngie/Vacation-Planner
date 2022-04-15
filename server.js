require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

const userRouter = require('./routes/api/users');
const vacationRouter = require('./routes/api/vacations');
const segmentsRouter = require('./routes/api/segments');
const activitiesRouter = require('./routes/api/activities');

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/auth')); 
app.use('/api/users', userRouter);
app.use('/api/vacations', activitiesRouter);
app.use('/api/vacations', segmentsRouter);
app.use('/api/vacations', vacationRouter);


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});

