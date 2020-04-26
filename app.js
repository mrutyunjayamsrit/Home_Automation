const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const utils = require('./Utils/utils.js');
const database = require('./database/db.js');

const {findDocuments, removeDocument, insertDocuments} = database;

const {addAllDeviceToList, getFormattedDeviceList, getDeviceInfo} = utils;

const PORT = process.env.port || 3030;
const { log } = require('./log_utils/app_logger');

const app = express();

addAllDeviceToList('./deviceList.json');

app.use(bodyParser.urlencoded({ extended: true }));

// To get the list oh home automation devices
app.get('/list', async (req, res) => {
  const query = {};
  const listOfDevices = await findDocuments(query);
  const deviceList = await getFormattedDeviceList(listOfDevices);
  console.log(deviceList);
  res.send(deviceList);
});

// Adding new device to the list
app.post('/add', async (req, res) => {
  const device = req.query.device;
  const getDeviceDetails = getDeviceInfo(device);
  const updateDevice = await insertDocuments(getDeviceDetails);
  console.log('Added device details: ', updateDevice);
  res.send('Added device to the Device List');
});

// Performing operation on devices like getting device data and send to broker and receive it back at client end using MQTT
app.get('/getDeviceInfo', (req, res) => {
  res.statusCode(200).send('Receving data from device and displayed back to user');
});

// Removing the device from the Device List
app.get('/delete', async (req, res) => {
  const deleteDevice = req.query.device;
  const query = {"deviceId": deleteDevice};
  const deleteItem = await removeDocument(query);
  res.send(`Successfully deleted device ${deleteDevice} from the list`);
});

// Listening to port 3030
app.listen(PORT, () => {
  log.debug('DEBUG: Listening on PORT: ', PORT);
});
