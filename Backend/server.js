const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const { MongoClient } = require('mongodb');
require('dotenv').config();
const bodyParser = require('body-parser');
const port = 3000;
const url = 'mongodb://127.0.0.1:27017'; // ✅ Use IPv4
const client = new MongoClient(url);
const dbname = 'passop';
app.use(bodyParser.json());


async function main() {
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('passwords');

    app.get('/', async (req, res) => {
        const findresult = await collection.find({}).toArray();
        res.json(findresult);
    });

    app.post('/', async (req, res) => {
        const password = req.body
        const result = await collection.insertOne(password);
        res.send({ success:true, result: result });
    });
    app.delete('/', async (req, res) => {
        const password = req.body
        const result = await collection.deleteOne(password);
        res.send({ success:true, result: result });
    });

    app.listen(port, () => {
        console.log(`PassOP backend listening on http://localhost:${port}`);
    });
} 

main().catch(console.error);
