const dbID = "dsa157";
const dbPW = "iAWflJhOS8dX6UXC";
const { getRegisterUserMsg } = require('@imtbl/imx-sdk');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://" + dbID + ":" + dbPW + "@cluster0.k24tioj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("test").collection("devices");
const database = client.db("timeOfTheSeason");
const users = database.collection("User");
const events = database.collection("Event");
const groups = database.collection("Group");
run();

//------------------ run ------------------//
async function run() {
    client.connect(err => {
            if (err) {
                console.log(err);
            }
    });
    try {
        await getUser("dsa157");
        await getAllUsers();

        //await addUser();
    } finally {
        await client.close();
        console.log("client closed");
    }
    console.log("done");
}

//------------------ get user ------------------//

async function getUser(username1) {
    console.log("getUser(" + username1 + ")");
    const query = { username: username1 };
    const options = {};
    const user = await users.findOne(query, options);
    console.log(user);
    return user;
}

//------------------ get users ------------------//

async function getAllUsers() {
    const query = { username : "xxx" }; 
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { username: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { username: 0, },
    };
    const cursor = users.find(query, options);
    // print a message if no documents were found
    if ((await users.countDocuments()) === 0) {
      console.log("No documents found!");
    } 
    else {
        console.log("Found documents...");
    }
    // replace console.dir with your callback to access individual elements
    // await cursor.forEach(console.dir);
}

//------------------ add user ------------------//

async function addUser() {
    const user = {
        username: "sheepstep",
        name: "Donna SilveriNo bytes, no problem. Just insert a document, in MongoDB",
    }
    const result = await users.insertOne(user);
    console.log(`Added user: ${result.name}`);
}

//------------------ update user ------------------//

async function updateUser() {
    const query = { username: "dsa157" };
    const options = {};
    const user = await users.findOne(query, options);
    console.log(user);
}

//------------------ delete user ------------------//

async function deleteUser() {
    const query = { username: "dsa157" };
    const options = {};
    const user = await users.findOne(query, options);
    console.log(user);
}
