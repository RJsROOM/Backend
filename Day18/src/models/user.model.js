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
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
})

const userModel= mongoose.model("users", userSchema)



module.exports=userModel;
/*
for showing the ids in followers or follwoing we have to store them somewhwere too which takes a fix amount of space and 1 single id takes approx. 12 bytes of space therefore storing followers or following list in arrays or anything will not be possible for us because the max a file in mongoDb can store upto is 16mb only.
the solution to this is EDGE COLLECTIONS which is a system design concept.
the data of each user is considered as a document and the collection which tells us the relationship between the documents is called as EDGE COLLECTION.
and for egde collections we create a different model.
*/