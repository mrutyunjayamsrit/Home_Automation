const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const utils = require('./Utils/utils.js');
const database = require('./database/db.js');
const config = require('config');
const mqtt = require('mqtt');

const {MQTTURL} = config;

const {findDocuments, removeDocument, insertDocuments, updateDocument} = database;

const {addAllDeviceToList, getFormattedDeviceList, getDeviceInfo} = utils;

const PORT = process.env.port || 3030;
const { log } = require('./log_utils/app_logger');

const app = express();

addAllDeviceToList('./deviceList.json');

app.set('view engine', 'ejs');
// For parsing the post request body and get requests as well
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded());

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());

app.get('/', (req,res)=>{
  res.render(path.join(`${__dirname}`, './views/index.ejs'))
})
// To get the list oh home automation devices
app.get('/list', async (req, res) => {
  const query = {};
  const listOfDevices = await findDocuments(query);
  const deviceList = await getFormattedDeviceList(listOfDevices);
  log.debug(deviceList);
  res.send(deviceList);
});

// Adding new device to the list
app.post('/add', async (req, res) => {
  const device = req.body.device;
  const status = req.body.status;
  log.debug('Device Data to add', device,status);
  const getDeviceDetails = getDeviceInfo(device, status);
  const updateDevice = await insertDocuments(getDeviceDetails);
  log.debug('Added device details: ', updateDevice);
  res.send('Added device to the Device List');
});

// Performing operation on devices like getting device data and send to broker and receive it back at client end using MQTT
app.get('/getDeviceInfo', async (req, res) => {
  let mqttOptions = {
    keepalive: 60,
    reschedulePings: true,
    protocolId: 'MQTT',
    protocolVersion: 4,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,  
    clean: false,
    clientId: 'test-client',
  };
  const query = {};
  const listOfDevices = await findDocuments(query);
  const client = mqtt.connect(MQTTURL, mqttOptions);
  const qos = 2;

  // To demonstrate both client and server side operation of MQTT also event handling.
  client.on('connect',()=>{
    if(client.connected === true){
      client.publish("topic01",JSON.stringify(listOfDevices),mqttOptions);
      log.debug("Message published");
    }
  client.subscribe('topic01',qos);
  });
  let msg = '';
  client.on('message',(topic, message)=>{
    console.log("Message is: ", message.toString());
    log.debug("Message is: ", message.toString());
    msg = message;
    log.debug("topic is: ",topic);
    if(message.length > 25){
      res.end(`Subscribed topic ${topic} from mqtt broker. subscribed message:- ${msg}`);
    }
    
    setTimeout(()=>{
      client.end();
    },10)
    
  });
});

// Removing the device from the Device List
app.get('/delete', async (req, res) => {
  const deleteDevice = req.query.device;
  log.debug('Deleting device: ', deleteDevice);
  const query = {"deviceId": deleteDevice};
  const deleteItem = await removeDocument(query);
  res.send(`Successfully deleted device ${deleteDevice} from the list`);
});

app.get('/updateDeviceInfo',async (req,res)=>{
  const deviceName = req.query.devicename;
  const Status = req.query.status;
  log.debug('Update: ', deviceName, Status);
  const statusUpdate = {$set: {status: Status}};
  const query = {deviceId: deviceName};
  // log.debug('Query:', query);
  const update = await updateDocument(query, statusUpdate);
  // log.debug("Status updated successfully: ", update);
  const query3 = {"deviceId": deviceName};
  const query2 = {"_id":0};
  const listOfDevices = await findDocuments(query3, query2);
  res.send(listOfDevices);
})

// Listening to port 3030
app.listen(PORT, () => {
  log.debug('DEBUG: Listening on PORT: ', PORT);
});
