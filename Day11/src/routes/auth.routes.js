//iska kaam: authentication(auth) API code krna

const express= require('express')
const userModel= require('../models/user.model')
const jwt= require('jsonwebtoken')
const crypto= require('crypto')
//note1
const authRouter= express.Router()

authRouter.post("/register", async(req,res)=>{
    const {name, email, password}= req.body

    const isUserExist= await userModel.findOne({email})

    if(isUserExist){
        return res.status(409).json({
            message: "user already exists with this email"
        })
    }
    //note4
    const hash= crypto.createHash("md5").update(password).digest("hex")

    const user= await userModel.create({
        name,email,password: hash
    })

    //note2
    const token= jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET
    )
    //note3
    res.cookie("jwt_token", token)





    res.status(201).json({
        message: "user registered successfully",user,
        token
    })
})

authRouter.post("/protected", (req, res)=>{
    console.log(req.cookies)

    res.status(200).json({
        message:"this is protected route"
    })
})

authRouter.post("/login", async (req,res)=>{
    const {email, password}= req.body;

    const user= await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:" you don't have an account, create one"
        })
    }

    const isPasswordMatched= user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatched){
        return res.status(401).json({
            message: "wrong password"
        })
    }

    const token= jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    res.cookie("jwt_token",token)

    res.status(200).json({
        message: "user logged in successfully",user
    })
})




module.exports=authRouter

//note1: agar hme app.js k alava kisi or bhi file me API create krna hrta h to hi hm router ka istmaal krte h.

//note2: //creating a token requires two things: user data and JWT_SECRET
    //to check whether the generated token contains our data or not we can go to jwt.io site and check there

//note3: cookies are those storages which are present on the client's browser and we can directly access them from our server. We can store the token in cookies and then we can access that token from cookies whenever we want to verify the user.

//note4: md5-hash is a website which is used to create hash codes for our strings..the hash codes which are created are non-reversible and can not go to its primary form again. we use this to protect the user passwords from breach-attacks from the attackers. the package which is used in this is crypto and this is pre-installed with npm.also the hash created for same strings are always same.