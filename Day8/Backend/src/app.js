//iska kaam: server create karna and uska config krna
const express = require('express');
const noteModel= require("./models/note.model")
const cors= require('cors');



const app = express();

app.use(express.json());
app.use(cors());



//POST method ka /notes API
app.post("/notes", async (req,res)=>{
    const {title, description}= req.body;
    const note=await noteModel.create({title, description});
    res.status(201).json({message: "Note created successfully", note});
})

//GET method ka /notes API
app.get("/notes", async (req,res)=>{
    const note= await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
        note
    })
})

//DELETE method ka /notes/:id API
// the id of the note to be deleted will be passed as a URL parameter which was created by the mongoose itself while creating the note.
app.delete("/notes/:id", async (req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

//PATCH method ka /notes/:id API
app.patch("/notes/:id", async (req, res)=>{
    const id= req.params.id;
    const {description}= req.body;
    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "Note updated successfully"
    })
} )






module.exports= app;
