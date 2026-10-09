require("dotenv").config()
const app=require("./src/app")
const connectDB=require("./src/db/db")

connectDB()

const port=process.env.PORT
app.listen(port,"0.0.0.0",()=>{
    console.log("server is running on port ",port)
})