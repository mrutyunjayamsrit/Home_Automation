# Home_Automation
smart home automation

Project follows the below structure for home automation devices:- 
1) database  - using mongo db to query list of devices.
2) log_utils - using standard library 'bunyan' for logging.
3) Utils - for additional method in code
4) views - for any web view or html files


to Start project use 'npm start' command.

To run the code locally follow the below steps:-
1) npm install
2) enable the flag InsertOnce: true to make initial device addition to locally running Mogo Db.
3) i have choosed mongo db to show more operation with no sql db's. same opearations i can perform with deviceList.json, by adding, removing and displying data from the deviceList.json file. use mongo db locally and create database 'devices' and collection 'deviceList'.
4) npm start
5) then try accessing url's:- http://localhost:3030/list, http://localhost:3030/delete?device=WifiRouter_device001
    for adding device use postman for post request :- 
    curl --location --request POST 'http://localhost:3030/add/' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "device": "WifiRouter",
    "status": "on"
  }'

  http://localhost:3030/getDeviceInfo

6) Usually for additing device info we will use websocket or MQTT protocol. I am making use of MQTT protocol to publish the information from my device and subscribe the topic001 which i have published with device infomation. In realtime devices will publish data to mqtt broker and the client will subscribe the data from the broker.
This also demonstrate the event handlings  with clinet.on() methods.


7) Using the library package 'bunyan' for logging and tracing purpose. we can enable log.debug, log.info, log.error using this.

8) To run Testcases use 'npm test' or mocha ./test or launch.json to execute in visual studio code

9) Added option to switch on and off the device and updating device status. This operation can be performed by sending sms or through the app.

