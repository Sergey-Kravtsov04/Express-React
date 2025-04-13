import express from "express";
import mongoose from "mongoose";
import * as validations from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as applicantController from "./controllers/applicantController.js"
import * as majorController from "./controllers/majorController.js"

mongoose.connect('mongodb+srv://admin:qqqqqq@cluster0.0vyfzlo.mongodb.net/AdmissionsCommittee?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('DB ok'))
.catch((err) => console.error(err))

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello, world!!!&')
});
app.post('/auth/login',validations.loginValidation ,applicantController.login);
app.post('/auth/register',validations.registerValidation, applicantController.register);
app.get('/auth/me',checkAuth, applicantController.getMe);

app.post('/majors',validations.majorCreateValidation, majorController.create);
app.get('/majors', majorController.getAll);
app.get('/majors/:id', majorController.getOne);
app.patch('/majors/:id',checkAuth, majorController.update);
app.delete('/majors/:id',checkAuth, majorController.remove);

app.listen(4444,(err)=>{
    if(err){
       return console.error(err);
    }
    console.log('Server OK');
});
