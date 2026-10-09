const foodPartnerModel = require("../models/foodPartner.model")
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")



// food partner auth middleware
async function authFoodPartnerMiddleware(req,res,next) {

    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorised"
        })
    }

    try {

      const decoded=  await jwt.verify(token,process.env.JWT_SECRET_KEY)

      const foodPartner=await foodPartnerModel.findById(decoded.id)

      req.foodPartner=foodPartner

      next()
        
    } catch (error) {
        console.log(error)

       return res.status(401).json({
        message:"Invalid Token"
       })

    }

}


// user auth middleware

async function authUserMiddleware(req,res,next) {
    
    const token=req.cookies.token

    if(!token){
        return res.status(400).json({
            "message":"Please login first"
        })
    }

    try {

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

            const user=await userModel.findById(decoded.id)

            req.user=user

            next()


        
    } catch (error) {
        
        console.log(error)

        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports={authFoodPartnerMiddleware, authUserMiddleware}