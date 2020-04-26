const { MongoClient } = require('mongodb');

// const URL = 'mongodb+srv://root:root@auth-qhv4r.mongodb.net:27017/CityList'
const URL = 'mongodb://localhost:27017';

const DbName = 'devices';
let db = '';

MongoClient.connect(URL, (error, client) => {
  if (error) {
    console.log('DB connect failure');
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
    }
    if (result) {
      console.log('DB insert successfull!!!');
    }
  });
};

/**
 *
 * @param {Query data from Mongo DB} query
 */

const findDocuments = function (query) {
  // Get the documents collection
  const collection = db.collection('statelist');
  return new Promise((resolve, reject) => {
    // Find some documents
    collection.find(query).toArray((err, docs) => {
      if (err) {
        console.log('Error to read the records');
        reject('Not able to fetch details');
      }
      console.log('Found the following records');
      // console.log(docs);
      resolve(docs);
    });
  });
};


module.exports = {
  insertDocuments,
  findDocuments
};
