const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.user_name}:${process.env.user_pass}@cluster0.qgd6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db("Coffeelist");
        const coffeeCollection = database.collection("coffedetails");


        app.post("/addcoffee", async (req, res) => {
            const coffee = req.body;
            console.log(coffee);
            const result = await coffeeCollection.insertOne(coffee)
            res.send(result)
        })




    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);










app.get("/", (req, res) => {
    res.send("Coffee Store Server is running....")
})

app.listen(port, (req, res) => {
    console.log("Server is running on port ", port);
})