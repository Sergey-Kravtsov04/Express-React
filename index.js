import express, { json } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";
import ApplicantModel from "./models/Applicant.js";

// mongoose.connect('mongodb+srv://admin:qqqqqq@cluster0.0vyfzlo.mongodb.net/AdmissionsCommittee?retryWrites=true&w=majority&appName=Cluster0')
    mongoose.connect('mongodb+srv://admin:qqqqqq@cluster0.0vyfzlo.mongodb.net/AdmissionsCommittee?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch((err) => console.error(err))

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello, world!!!&')
});

app.post('/auth/login', async (req,res)=>{
    try{
        const user = await ApplicantModel.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({message:'Не удалось найти пользователя'})
        }
        const isValidPass = await bcrypt.compare(req.body.password,user._doc.passwordHash)
        if(!isValidPass){
            return res.status(400).json({message:'Неверный логин или пароль'})
        }

        const token = jwt.sign({_id: user._id},'secretkey',{expiresIn:'90d'});
        const {passwordHash, ...userData} = user._doc

        res.status(200).json({
            ...userData,
            token:token
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Не удалось зарегистрироваться"
        })
    }
});

app.post('/auth/register',registerValidation, async (req,res)=>{
    try{
        const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)

    const doc = new ApplicantModel({
        fullName:req.body.fullName,
        email:req.body.email,
        passwordHash: hash,
        avatarUrl:req.body.avatarUrl,
        major_id:req.body.major_id
    })

    const user = await doc.save()

    const token = jwt.sign({_id:user._id},'secretkey',{expiresIn:"90d"})

    const {passwordHash,...userData} = user._doc
    res.json({
        userData,
        token
    })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Не удалось зарегистрироваться"
        })
    }
});

app.listen(4444,(err)=>{
    if(err){
       return console.error(err);
    }
    console.log('Server OK');
});
