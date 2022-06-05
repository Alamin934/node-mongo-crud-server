const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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

        //Get Api
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            // if ((await cursor.count()) === 0) {
            //     console.log("No documents found!");
            // }
            res.send(users);
        });

        //Get Single Api
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usersCollection.findOne(query);
            // console.log('get the user id', id);
            res.send(user)
        });

        //POST Api
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.json(result);
            // console.log('got user', req.body);
            console.log('added user', result);
        });

        //Update Api


        //Delete Api
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log('deleting id', result);
            res.json(result);
        })

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
