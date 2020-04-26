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
