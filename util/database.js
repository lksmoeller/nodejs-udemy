const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGO_DB_CONNECTION_URL)
    .then(result => {
        console.log('connected');
        callback(result);
    })
    .catch(err => console.log(err));
}


module.exports = mongoConnect;

