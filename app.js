const { default: mongoose } = require("mongoose");
const express = require('express');
const app = express();

// START SERVER
app.listen(3000, (error)=> {
    console.log("http://localhost:3000");
})

// Require for CREATE DATA to Mongodb
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// Connection Nodejs with Database on Mongodb
mongoose.connect('mongodb://localhost:27017/Todos', {useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log('Connected successfully');
})

// CRUD WITH MONGODB
// DEFINE SCHEMA FOR MODEL
const MySchema = new mongoose.Schema({ 
    title: {
        type : String,
        required: true // Optional code
    },
    completed: {
        type : Boolean,
        required : true
    }
});

const MyModel = mongoose.model('tasks', MySchema);

// GET DATA FROM MONGODB
app.get('/name', (req, res)=>{
    MyModel.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    })
})

// TO REQUEST SPECIFIC DATA FROM MONGODB
app.get('/completed', (req, res)=>{
    MyModel.find({completed: true})
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    })
})
// TO REQUEST SPECIFIC DATA FROM MONGODB
app.get('/title', (req, res)=>{
    let title = req.query.name;
    MyModel.find({title: title})
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    })
})

// ADD DATA TO MONGODB WITH NODEJS
app.post('/add_task', (req, res)=>{
    MyModel.create(req.body)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
    })
})

// DELETE DATA ON MONGODB
app.delete('/tasks/:id', (req, res)=>{
    MyModel.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.send(result);
     })
    .catch((error)=>{
        res.send(error);
    })
})
app.put('/tasks/:id', (req, res)=>{
    let data = req.body;
    MyModel.updateOne({_id: req.params.id}, data)
    .then((result)=>{
        res.send(result);
        console.log("Data updated")
    })
    .catch((error)=>{
        res.send(error);
        console.log("Data not updated...!")
    })
})

