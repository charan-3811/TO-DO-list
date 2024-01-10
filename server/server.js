const express = require('express')
const bodyParser=require('body-parser')
const app = express()
const cors = require('cors');
const PORT = 3050
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const { MongoClient, ObjectId} = require("mongodb");

const uri = "mongodb+srv://mchs109872001:Cherry@cluster0.bp4gady.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let myColl
async function connect() {
    const myDB = await  client.db("todo");
    myColl = await myDB.collection("item");
    console.log("connected to db")

}
connect().then()

app.listen(PORT,()=>{

    console.log("connected")
})

app.get('/view',async  function (req, res) {
    // getting all the data
    let x=await myColl.find().toArray()
    res.send(x)

})
app.post('/add', async (req, res) => {
    const dataFromFrontend = await req.body;

    // Do something with the data
    res.send('Data received successfully');
    await myColl.insertOne({name:dataFromFrontend.name})

});
app.post('/update', function (req, res) {
    // updating a data by its ID and new value
    console.log(req.body)
    myColl.findOneAndUpdate(
        { _id: new ObjectId(req.body.id) },
        { $set: { name: req.body.name } },
        function () {
            res.send('Success updated!')
        }
    )
})

app.post('/delete', async function (req, res) {
    // deleting a data by it's ID
    console.log("running")
    console.log(req.body.id)
    await  myColl.deleteOne(
        { _id: new ObjectId(req.body.id) },
        function (err) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Successfully deleted!');
            }
        }
    );
});