import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as applicantController from "./controllers/applicantController.js"

mongoose.connect('mongodb+srv://admin:qqqqqq@cluster0.0vyfzlo.mongodb.net/AdmissionsCommittee?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('DB ok'))
.catch((err) => console.error(err))

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello, world!!!&')
});
app.post('/auth/login', applicantController.login);
app.post('/auth/register',registerValidation, applicantController.register);
app.get('/auth/me',checkAuth, applicantController.getMe);

app.listen(4444,(err)=>{
    if(err){
       return console.error(err);
    }
    console.log('Server OK');
});
