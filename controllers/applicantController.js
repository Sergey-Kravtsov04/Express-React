import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import ApplicantModel from "../models/Applicant.js";

export const login = async (req,res)=>{
    try{
        const applicant = await ApplicantModel.findOne({email:req.body.email});
        if(!applicant){
            return res.status(404).json({message:'Не удалось найти абитуриента'})
        }
        const isValidPass = await bcrypt.compare(req.body.password,applicant._doc.passwordHash)
        if(!isValidPass){
            return res.status(400).json({message:'Неверный логин или пароль'})
        }

        const token = jwt.sign({_id: applicant._id},'secretkey',{expiresIn:'90d'});
        const {passwordHash, ...applicantData} = applicant._doc

        res.status(200).json({
            ...applicantData,
            token:token
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Не удалось зарегистрироваться"
        })
    }
}

export const getMe = async(req,res)=>{
 try{
    const applicant = await ApplicantModel.findById(req.applicantId);

    if(!applicant){
        return res.status(404).json({
            message:"Пользователь не найден"
        })
    }
    const {passwordHash, ...applicantData} = applicant._doc

        res.status(200).json({
            ...applicantData
        })
 }
 catch(err){
    console.log(err);
    res.status(500).json({
        message:"Нет доступа"
    })
 }   
}

export const register = async (req,res)=>{
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
            major:req.body.major
        })

        const applicant = await doc.save()

        const token = jwt.sign({_id:applicant._id},'secretkey',{expiresIn:"90d"})

        const {passwordHash,...applicantData} = applicant._doc
        res.json({
            applicantData: applicantData,
            token
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Не удалось зарегистрироваться"
        })
    }
}