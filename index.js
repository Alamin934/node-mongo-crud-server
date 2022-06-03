const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

const uri = "mongodb+srv://alamin934:Tt574OjtgKOJyBnX@cluster0.ogrrwih.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('Running CRUD server');
});

async function run() {
    try {
        await client.connect();
        const database = client.db("practice");
        const usersCollection = database.collection("users");
        // create a document to insert
        const doc = {
            email: "alaminsojib@gmail.com",
            name: "alamin",
        }

        const result = await usersCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('Running server port on', port);
})
// Tt574OjtgKOJyBnX
