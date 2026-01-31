// iska kaam: server create karna and uska config krna
const express= require("express")
const app= express()

const notes=[]

app.use(express.json())

//POST method ka /notes API
app.post("/notes", (req,res)=>{
    notes.push(req.body)

    // status code 201 tells us that a new resource has been created successfully ie. a successful POST reqst
    res.status(201).json({
        message: "note created successfully"
    })
})

//GET method ki /notes API
app.get("/notes", (req,res)=>{

    // status code 200 tells us that a single or a set of existing resource has been sent successfully ie. a successful GET reqst
    res.status(200).json({
        notes: notes
    })
})

//DELETE method ka /notes/:index API
app.delete("/notes/:ind", (req,res)=>{
    delete notes[req.params.ind]

    // status code 204 tells us that a note has been deleted successfully ie. a successful DELETE reqst...but with 204 status code the postman shows no content in its body but the work has been done.
    res.status(204).json({
        message:"note deleted successfully"
    })
})

//PATCH methid ka /notes/:ind API
app.patch("/notes/:ind", (req,res)=>{
    notes[req.params.ind].description= req.body.description

    // status code 200 tells us that a single or a set of existing resource has been sent/updated successfully ie. a successful GET reqst
    res.status(200),json({
        message: "updation in a note has been done successfully"
    })
})

module.exports=app




module.exports=app
// status codes are used to reflect the client about its actions..whether its action is completed or not, and what is the message we can give to the user depending on its POST of any data.
// since we know that when we will restart our server whole of our file runs again and in our RAM when we re-run our file the location of it gets changed and the previous space also consumes space..this issue gets solved by the DATABASE, instead of using variables in our file like notes array, we create a central file/database which stores all the data..this utilizes a single space and our file gets optimized in terms of space.
