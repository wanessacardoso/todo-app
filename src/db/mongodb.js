const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

const user = {
  name: 'João do Pulo',
  age: 40,
}

const handleInsertUser = (error, result) => {
  if (error) {
    return console.log('Unable to insert user: ', error.message);
  }
  console.log(result);
}

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database: ', error.message);
  }

  const db = client.db(databaseName);

  db.collection('users').insertOne(user, handleInsertUser)

});
