const PORT = 3000;

require('dotenv').config();

const express = require("express");
const app = express();
app.use(express.json());
const routes = require("../routes/community.cjs");
app.use('/', routes); 

const listener = app.listen(process.env.PORT || PORT, () => {
    console.log('App is listening on port ' + listener.address().port)
})

const mongoose = require('mongoose');
//establish connection to database
const ID = "dsa157";
const PW = "iAWflJhOS8dX6UXC";

console.log('ENV: ' + JSON.stringify(process.env));
console.log('MID: ' + process.env.MID);
console.log('MPW: ' + process.env.MPW);
console.log('URI: ' + process.env.MONGODB_URI);

/*
mongoose.connect(
    process.env.MONGODB_URI,
    { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);
*/

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dsa157:<password>@cluster0.k24tioj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/