const foodModel = require("../models/food.model")
const storageService = require("../service/storage.service")
const likeModel = require("../models/likes.model")
const saveFoodModel = require("../models/saveFood.model")
const { v4: uuid } = require("uuid")


// create food
async function createFood(req, res) {
    const { name, description } = req.body
    const file = req.file

    console.log(req.file)
    console.log(req.body)
    const fileUploadedResult = await storageService.uploadFile(file.buffer.toString("base64"), uuid())

    const foodItem = await foodModel.create({
        name,
        description,
        video: fileUploadedResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "Food saved successfully",
        food: foodItem
    })
}


// get food

async function getFoodItems(req, res) {

    const foodItems = await foodModel.find().populate("foodPartner", "email _id")

    return res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })


}

// like

async function likeFood(req, res) {

    console.log("req.body.foodId")
    console.log(req.body.foodId)

    const { foodId } = req.body

    console.log("User:", req.user._id);
console.log("Food:", foodId);

    const isAlreadyLiked = await likeModel.findOne({
        user: req.user._id,
        food: foodId
    })

    console.log("Already liked:", isAlreadyLiked);

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: req.user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })



        return res.status(200).json({
            "message": "Unliked"
        })
    }




    const like = await likeModel.create({
        user: req.user._id,
        food: foodId
    })

    console.log("Created:", like);

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    return res.status(201).json({
        "message": "Liked",
        like
    })



}

// save

async function saveFood(req, res) {

    const { foodId } = req.body

    const isAlreadySaved = await saveFoodModel.findOne({
        user: req.user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveFoodModel.deleteOne({
            user: req.user._id,
            food: foodId
        })

        await saveFoodModel.findOneAndUpdate(foodId,{
            $inc: {saveCount:-1}
        })

        return res.status(200).json({
            message:"Food unsaved",
        })
    }


    const save=await saveFoodModel.create({
        user:req.user._id,
        food:foodId
    })

    await saveFoodModel.findOneAndUpdate(foodId,{
        $inc: {saveCount:1}
    })

    return res.status(200).json({
        "message":"Food saved"
    })



}


module.exports = { createFood, getFoodItems, likeFood, saveFood }

