import MajorModel from "../models/Major.js"

export const create = async (req,res)=>{
    try{
        const doc = new MajorModel({
            title:req.body.title,
            description:req.body.description
        })

        const major = await doc.save();
        res.status(200).json(major)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Не удалось добавить специальность"
        })
    }
}

export const getAll = async (req,res)=>{
    try{
        const majors = await MajorModel.find();

        res.status(200).json({
            ...majors
        })
    }
    catch(err){
        res.status(500).json({
            message:"Произошла ошибка"
        });
    }
}
export const getOne = async (req,res)=>{
    try{
        //const major = await MajorModel.findOne({_id:req.params.id}); // NoSQL
        const major = await MajorModel.findById(req.params.id); // ODM

        if(!major){
            return res.status(404).json({
                message:"Не удалось найти статью"
            })
        }
        res.status(200).json({
            major
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Произошла ошибка"
        });
    }
}
export const remove = (req,res) =>{
    try{
        MajorModel.findOneAndDelete({_id:req.params.id})
        .then((doc) => {
            console.log(doc)
            if(doc == null){
                console.log("Тут фатальная ошибка")
                return res.status(404).json({
                    message:"Не удалось найти статью"
                })
            }
            return res.status(200).json({
                message:"Статья успешно удалена"
            })
        })
        .catch((err)=>{
            console.log(err)
            return res.status(500).json({
                message:"Произошла ошибка"
            });
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Произошла ошибка"
        });
    }
}

export const update = async (req,res) =>{
    try{
        await MajorModel.updateOne({_id:req.params.id},{
            title:req.body.title,
            description:req.body.description
        });
        res.status(200).json({
            message:"статья обновлена успешно"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Произошла ошибка"
        }); 
    }
}