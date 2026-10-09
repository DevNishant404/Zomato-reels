const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodPartner.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// register user
async function registerUser(req, res) {

    const { fullname, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        res.status(400).json({
            "message": "User already Exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullname,
        email,
        password: hash
    })


    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY)

    res.cookie("token", token)

    res.status(201).json({
        "message": "User register successfully",

        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullnametoken
        }
    })



}

// login user
async function loginUser(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(400).json({
            message: "Invalid Credential"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY)

    res.cookie("token", token)


    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            fullname: user.fullname,
            emai: user.email,

        }
    })

}


// logout user

async function logoutUser(req, res) {
    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

// register food partner
async function registerFoodPartner(req, res) {

    const { email, name, password,businnessName,businessConatact,fullAddress  } = req.body


    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email })

    if (isAccountAlreadyExists) {
        res.status(400).json({
            message: "User already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await foodPartnerModel.create({
        email,
        name,
        password: hash,
        businessConatact,
        businnessName,
        fullAddress
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY)


    res.cookie("token", token)

    res.status(201).json({
        message: "Registered successfully",
        foodPartner: {
            _id: user._id,
            name: user.name,
            email: user.email,
            fullAddress:user.fullAddress
        }
    })

}

// login food partner
async function loginFoodPartner(req, res) {

    const { email, password } = req.body

    const user = await foodPartnerModel.findOne({ email })

    if (!user) {
        res.status(400).json({
            message: "User not exists"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(400).json({
            message: "Invalid Credential"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)

    res.cookie("token", token)

    res.status(200).json({
        message: "Logged in successfully"
    })

}


// logout food partner

async function logoutFoodpartner(req, res) {

    res.clearCookie("token")

    res.status(200).json({
        message: "Logged out successfully"
    })

}




module.exports = {
    registerUser, loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodpartner
}