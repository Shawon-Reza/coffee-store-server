const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


const app=express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;




const uri = `mongodb+srv://${process.env.user_name}:${process.env.user_pass}@cluster0.qgd6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");





  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get("/",(req,res)=>{
    res.send("Coffee Store Server is running....")
})

app.listen(port,(req,res)=>{
    console.log("Server is running on port ",port);
})