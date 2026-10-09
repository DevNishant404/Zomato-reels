const mongoose=require("mongoose")

const connectionString=process.env.MONGODB_URI

async function connectDB() {

    try {
    await mongoose.connect(connectionString)
        console.log("Database connect")
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB