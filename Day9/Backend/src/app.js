//iska kaam: server create karna and uska config krna
const express = require('express');
const noteModel= require("./models/note.model")
const cors= require('cors');
const path= require('path');



const app = express();
app.use(express.json());
app.use(cors());
//app.use(express.static("./public")) this middleware is used to serve the static files in the public folder, it will look for the files im the public folder and serve them when requested.
app.use(express.static("./public"))



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

app.use('*name', (req,res)=>{
    // res.send("this is wild card route")
    // res.sendfile() only accepts the whole complet path of the file or use the path module to get the path of the file.
    // res.sendFile("C:/Users/raksh/Desktop/COHORT-2/Backend/Day8/Backend/public/index.html")
    // __dirname gives the path of the current directory, we have to go one step back,for this we use ".." and then go to public folder and then get to the index.html file.
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})




module.exports= app;

// '*name' is called the wild card route, it will match with all the routes which are not defined in the server. it should be defined at the end of all the routes.
