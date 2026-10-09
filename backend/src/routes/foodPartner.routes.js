const express=require("express")
const foodPartner=require("../controllers/foodPartner.controller")
const authMiddleware =require("../middlewares/auth.middleware")

const router=express.Router()

router.get("/food-partner/:id",authMiddleware.authFoodPartnerMiddleware,foodPartner.getFoodPartnerById)


module.exports=router