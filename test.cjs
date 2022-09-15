const dbID = "dsa157";
const dbPW = "iAWflJhOS8dX6UXC";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://" + dbID + ":" + dbPW + "@cluster0.k24tioj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("test").collection("devices");
const database = client.db("timeOfTheSeason");
const users = database.collection("User");
const events = database.collection("Event");
const groups = database.collection("Group");
run();

async function run() {
    client.connect(err => {
            if (err) {
                console.log(err);
            }
    });
    try {
        const query = { username: "dsa157" };
        const options = {};
        const user = await users.findOne(query, options);
        console.log(user);
    } finally {
        await client.close();
        console.log("client closed");
    }
    console.log("done");
}
