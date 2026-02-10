//iska kaam: user schema define krna and uska model bnana

//schema create krte h format btane k lie and model create krte taaki operations perform kr ske user k schema pr
const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "account already exist with this email"]
    },
    password: String,
})

const userModel= mongoose.model("users", userSchema)

module.exports=userModel