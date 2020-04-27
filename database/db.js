const { MongoClient } = require('mongodb');
const config = require('config');
const {MongoURL} = config;
const URL = MongoURL;

const DbName = 'devices';
let db = '';

MongoClient.connect(URL, (error, client) => {
  if (error) {
    log.debug('DB connect failure');
    return;
  }

  console.log('DB connected successfully');

  db = client.db(DbName);
  // console.log("DB: ", db);
});

insertDocuments = (content) => {
  const collection = db.collection('deviceList');

  collection.insertMany(content, (error, result) => {
    if (error) {
      console.log('DB insert failed');
      log.debug('DB insert failed');
    }
    if (result) {
      log.debug('DB insert successfull!!!');
    }
  });
};

/**
 *
 * @param {Query data from Mongo DB} query
 */

const findDocuments = function (query) {
  // Get the documents collection
  const collection = db.collection('deviceList');
  return new Promise((resolve, reject) => {
    // Find some documents
    collection.find(query).toArray((err, docs) => {
      if (err) {
        console.log('Error to read the records');
        log.error('Error to read the records');
        reject('Not able to fetch details');
      }
      console.log('Found the following records');
      // console.log(docs);
      resolve(docs);
    });
  });
};

const updateDocument = function(query) {
  // Get the documents collection
  const collection = db.collection('deviceList');
  return new Promise((resolve, reject)=>{
    collection.updateOne(query, function(err, result) {
      if(err){
        console.log('Error to update the records');
        log.error('Error to update the records');
        reject('Error to update the records');
      }
      console.log("Updated the document with the field a equal to 2");
      resolve(result);
    });
  })
}

const removeDocument = function(query) {
  // Get the documents collection
  const collection = db.collection('deviceList');
  return new Promise((resolve, reject)=>{
    collection.deleteOne(query, function(err, result) {
      if(err){
        console.log('Error while removing devce from list');
        log.error('Error while removing devce from list');
        reject('Error while removing devce from list');
      }
      resolve(result);
    });
  }) 
}


module.exports = {
  insertDocuments,
  findDocuments,
  updateDocument,
  removeDocument
};
