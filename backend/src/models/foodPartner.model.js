const mongoose =require("mongoose")

const foodPartnerSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    businnessName:{
        type:String,
        required:true
    },
    businessConatact:{
        type:String,
        required:true
    },
    fullAddress:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})

const foodPartnerModel=mongoose.model("foodpartner",foodPartnerSchema)

module.exports=foodPartnerModel