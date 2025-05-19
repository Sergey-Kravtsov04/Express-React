import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors"
import * as validations from "./validations.js";
import { applicantController, majorController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

import ApplicantModel from "./models/Applicant.js";


mongoose.connect('mongodb+srv://admin:qqqqqq@cluster0.0vyfzlo.mongodb.net/AdmissionsCommittee?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('DB ok'))
.catch((err) => console.error(err))

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination:(_,__,cb) =>{
        cb(null,"uploads");
    },
    filename:(_,file,cb) =>{
        cb(null,file.originalname);
    }
})
const upload = multer({storage})

app.get('/',(req,res)=>{
    res.send('Hello, world!!!')
});

app.post('/upload',checkAuth,upload.single('image'),(req,res)=>{
    res.json({
        url:`uploads/${req.file.originalname}`
    })
})

app.post('/auth/login',validations.loginValidation,handleValidationErrors ,applicantController.login);
app.post('/auth/register',validations.registerValidation,handleValidationErrors, applicantController.register);
app.get('/auth/me',checkAuth, applicantController.getMe);

app.get('/users', async (req,res)=>{
    try{
        const users = await ApplicantModel.find();

        if(!users){
            return res.status(404).json({
                message:"Не не удалось найти пользователей"
            })
        }
        
        res.status(200).json({
            ...users,
            
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Не удалось получить список"
        })
    }
})

app.post('/majors',checkAuth,validations.majorCreateValidation, majorController.create);
app.get('/majors', majorController.getAll);
app.get('/majors/:id', majorController.getOne);
app.patch('/majors/:id',checkAuth,validations.majorCreateValidation, majorController.update);
app.delete('/majors/:id',checkAuth, majorController.remove);

app.listen(4444,(err)=>{
    if(err){
       return console.error(err);
    }
    console.log('Server OK');
});
