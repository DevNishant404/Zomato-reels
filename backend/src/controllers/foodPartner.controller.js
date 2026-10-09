
const foodPartnerModel=require("../models/foodPartner.model")
const mongoose=require("mongoose")
const foodModel=require("../models/food.model")

async function getFoodPartnerById(req,res) {

    const foodPartnerId=req.params.id

    const foodpartner=await foodPartnerModel.findById(foodPartnerId)
    const foodPartnerById=await foodModel.find({foodPartner:foodPartnerId})

    if(!foodpartner){
        return res.status(404).json({
            message:"Food partner not found"
        })
    }
    
    res.status(200).json({
        message:"Food partner retrived",
        foodpartner:{
            _id:foodpartner._id,
            name:foodpartner.name,
            email:foodpartner.email,
            businnessName:foodpartner.businnessName,
            businessConatact:foodpartner.businessConatact,
            fullAddress:foodpartner.fullAddress,
            foods:foodPartnerById
        }
    })
    
}


module.exports={
    getFoodPartnerById
}