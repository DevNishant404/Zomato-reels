const mongoose=require("mongoose")

const saveFoodSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food",
        require
    },
    saveCount:{
        type:Number,
        default:0
    }
})

const saveFoodModel=mongoose.model("save",saveFoodSchema)

module.exports=saveFoodModel