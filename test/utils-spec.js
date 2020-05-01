const assert = require('assert');
const utils = require('../Utils/utils');
const logger = require('../log_utils/app_logger');

const {
  log
} = logger;

const {addAllDeviceToList, getFormattedDeviceList, getDeviceInfo} = utils;

describe('Test must verify all the functions of Utils.Js',()=>{
  it('Must verify addAllDeviceToList', ()=>{
    let expectedResult = addAllDeviceToList('');
    let actualResult = undefined;  // Filename is not passed to addAllDeviceToList
    assert.equal(expectedResult, actualResult);
  });

  it('Must verify getFormattedDeviceList', async ()=>{
    const data = [{
      "deviceId": "bedLamp_device004",
      "dataTs": 1584974220,
      "connected": false,
      "status":"on",
      "deviceCount": 1
    }
    ]
    let expectedResult = await getFormattedDeviceList(data);
    let actualResult = {deviceId: "bedLamp_device004", status: "on"};  
    assert.equal(expectedResult[0].deviceId, actualResult.deviceId);
  });

  it('Must verify getDeviceInfo', ()=>{
    let device = 'refrigirator';
    let status = 'On';
    let expectedResult = getDeviceInfo(device, status);
    let actualResult = 'refrigirator_device001';  
    assert.equal(expectedResult[0].deviceId, actualResult);
  });
});