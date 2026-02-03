// iska kaam: ye server ko create karta h and uska config karta h

const express=require("express")
const app=express();
const noteModel= require("./models/notes.model")


app.use(express.json())

//POST method ki /notes API
app.post("/notes", async (req,res)=>{
    const {title, description}= req.body
    const note= await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})

//GET method ki /notes API
app.get("/notes", async (req,res)=>{
    const note= await noteModel.find()

    res.status(200).json({
        message: "notes fetched successfully",
        note
    })
})




module.exports=app;

//find() method always stores our data in arrays of objects.