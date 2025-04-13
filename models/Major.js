import mongoose from "mongoose";

const MajorSchema = mongoose.Schema(
    {
        title:{
            type: String,
            require: true
        },
        description:{
            type: String,
            require: true
        }
    },
    {
        timestamps:true,
    }
);

export default mongoose.model('Major',MajorSchema)