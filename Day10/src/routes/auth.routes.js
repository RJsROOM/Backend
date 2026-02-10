//iska kaam: authentication(auth) API code krna

const express= require('express')
const userModel= require('../models/user.model')
const jwt= require('jsonwebtoken')
//note1
const authRouter= express.Router()

authRouter.post("/register", async(req,res)=>{
    const {name, email, password}= req.body

    const isUserExist= await userModel.findOne({email})

    if(isUserExist){
        return res.status(400).json({
            message: "user already exists with this email"
        })
    }

    const user= await userModel.create({
        name,email,password
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


module.exports=authRouter

//note1: agar hme app.js k alava kisi or bhi file me API create krna hrta h to hi hm router ka istmaal krte h.

//note2: //creating a token requires two things: user data and JWT_SECRET
    //to check whether the generated token contains our data or not we can go to jwt.io site and check there

//note3: cookies are those storages which are present on the client's browser and we can directly access them from our server. We can store the token in cookies and then we can access that token from cookies whenever we want to verify the user.