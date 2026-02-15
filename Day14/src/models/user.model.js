// iska kaam: user schema create krna or uska model bnana
const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exists"],
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"],
    },
    password:{
        type: String,
        required: [true, "password is required"],
    },
    bio: String,
    profileImage:{
        type: String,
        default:"https://ik.imagekit.io/qbtyrmiqx/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.webp"
    }
})

const userModel= mongoose.model("users", userSchema)



module.exports=userModel;