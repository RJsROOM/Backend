//iska kaam: jo bhi API create krte h uska logic idhr hhi likha jata h 
const userModel = require("../models/user.model");
const crypto= require("crypto");
const jwt= require("jsonwebtoken");


async function registerController(req,res){
    const {email, password, username, bio, profileImage}= req.body;

    const isUserAlreadyExists= await userModel.findOne({
        $or: [
            {email}, 
            {username}
        ],
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user alrwady exists" + (isUserAlreadyExists.email == email ? "email already exists" : "username already exists")
        })
    }

    const hash= crypto.createHash("sha256").update(password).digest("hex");

    const user= await userModel.create({
        email,
        password: hash,
        username,
        bio,
        profileImage,
    })

    //token me kya rhna chiye-- 1.user ka data hona chiye 2.data unique hona chiye
    const token= jwt.sign({
        id: user._id,
    }, 
    process.env.JWT_SECRET,
    { expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        }
    })


}


async function loginController(req,res){
    const {email, username, password}= req.body;

    const user=await userModel.findOne({
        $or: [
            {email: email},
            {username: username}
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    const hash= crypto.createHash("sha256").update(password).digest("hex");

    const isPasswordCorrect= hash==user.password
    if(!isPasswordCorrect){
        return res.status(401).json({
            meesage: "wrong password"
        })
    }

    const token= jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    )

    res.cookie("token", token);
    res.status(200).json({
        message: "user logged-in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        }
    })
}


module.exports= {
    registerController,
    loginController,
}