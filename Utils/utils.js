const fs = require('fs');
const {log} = require('../log_utils/app_logger');

const database = require('../database/db.js');

const {insertDocuments} = database;

function addAllDeviceToList(filename){
  const read = fs.readFile(filename,(err,data)=>{
    if(err){
      log.error('DEBUG: error in reading a file: ', filename);
    }
    // console.log(JSON.parse(data));
    // Bulk insert operation is done only once to DB at the begginning
    // insertDocuments(JSON.parse(data));
  });
}

function getFormattedDeviceList(deviceList){
  return new Promise((resolve, reject)=>{
    let deviceInfo = [];
    for(let data of deviceList){
      deviceInfo.push({
        deviceId: data.deviceId,
        status: data.status
      })
    }
    resolve(deviceInfo);
  })
}

function getDeviceInfo(device){
  let deviceInfo = [];
  deviceInfo.push({
    "deviceId": `${device}_device001`,
    "dataTs": 1584974220,
    "status": "on",
    "deviceCount": 1
  })
  return deviceInfo;
}

module.exports = {
  addAllDeviceToList,
  getFormattedDeviceList,
  getDeviceInfo
}