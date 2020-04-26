const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.port || 3030;
const { log } = require('./log_utils/app_logger');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/list', (req, res) => {
  res.statusCode(200).send('List provides all home automation devices');
});


app.post('/add', (req, res) => {
  res.statusCode(200).send('Addition of individual home automation devices');
});

app.get('/getDeviceInfo', (req, res) => {
  res.statusCode(200).send('Receving data from device and displayed back to user');
});

app.get('/delete', (req, res) => {
  res.statusCode(200).send('Successfully deleted device from the list');
});


app.listen(PORT, () => {
  log.debug('DEBUG: Listening on PORT: ', PORT);
});
