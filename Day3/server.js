const express= require('express');
const app= express();


app.use(express.json()); // it is a middleware which helps us to read the body of the request, because express by default cant use req.body.


const notes=[]

app.post("/notes", (req,res)=>{
    console.log(req.body);
    notes.push(req.body); // adding the body of the request to the notes array.
    res.send("note created");
})

app.get("/notes", (req,res)=>{
    res.send(notes);
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});