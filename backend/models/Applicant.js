import mongoose from "mongoose";

const schema = mongoose.Schema;

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
            type: schema.Types.ObjectId,
            ref:"Major",
        }
    },
    {
        timestamps:true,
    }
);

export default mongoose.model('Applicant',ApplicantSchema)