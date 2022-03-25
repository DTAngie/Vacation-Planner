require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');

require('./config/database');

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

// app.use(require('./config/auth')); 

//Routes
// app.use('/api/getContent', require('./routes/api/content'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});

