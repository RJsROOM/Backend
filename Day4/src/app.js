// iss file ka do kaam rhta h- server create krna or server ka config krna 
const express= require("express")
const app= express()  //server created


app.use(express.json()) //it is a middleware which is used to read the data of body

const notes=[]



app.get("/", (req,res)=>{
    res.send("Hello Rakshit, how are you?")
})

// POST method ki /notes API
app.post("/notes", (req,res)=>{
    // console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send("note created")
})
// GET method ki /notes API
app.get("/notes", (req,res)=>{
    res.send(notes)
})
//DELETE method ki /notes API
///notes api me konsa note delete krna h wo to dynamic rhta h qki hme kya pta client ko kya del krna h to uske lie hmlog api k aage /: istmaal krte h or usko PARAMS kaha jaata h
app.delete("/notes/:index", (req,res)=>{    
    // console.log(req.params)
    delete notes[req.params.index]
    res.send("note deleted successfully")
})
// PATCH methid ki /notes/:index API
app.patch("/notes/:index", (req,res)=>{
    notes[req.params.index].description= req.body.description
    res.send("notes updated successfully")
})



module.exports=app;




