import mongoose from "mongoose";


const ApplicantSchema = mongoose.Schema(
    {
        fullName:{
            type: String,
            require: true
        },
        email:{
            type: String,
            require:true,
            unique:true
        },
        passwordHash:{
            type: String,
            require:true,
        },
        avatarUrl:String,
        major:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Major'
        }
    },
    {
        timestamps:true,
    }
);

export default mongoose.model('Applicant',ApplicantSchema)