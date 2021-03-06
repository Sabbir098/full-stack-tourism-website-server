const express = require('express')

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');

// middle-ware
app.use(cors())
app.use(express.json());


// dataOfTourism
// sReShZhxxlYCvl3R
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bvp7x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect()
        const database = client.db('onlineTourism')
        const serviceCollection = database.collection('services');        

        // GET Services API
        app.get('/services', async(req, res) =>{
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);

        })

    }
    finally{
        // await client.close()
    }

}
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello gudugudugudu!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})