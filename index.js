import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:qqqqqq@cluster0.0vyfzlo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch((err) => console.error(err))

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello, world!!!&')
});

app.post('/auth/login',(req,res)=>{
    
})

app.listen(4444,(err)=>{
    if(err){
       return console.error(err);
    }
    console.log('Server OK');
})
