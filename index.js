const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
//MiddleWare
app.use(cors());
app.use(express.json());

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

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.json(result);
            // console.log('got user', req.body);
            console.log('added user', result);
        });

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);


app.listen(port, () => {
    console.log('Running server port on', port);
})
// Tt574OjtgKOJyBnX
