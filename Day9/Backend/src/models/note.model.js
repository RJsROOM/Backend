const mongoose= require('mongoose');

const noteSchema= new mongoose.Schema({
    title: String,
    description: String
})

//models are created using schemas and they are used to perform CRUD operations on the database..and through models we can interact with multiple types of collections in the database like "notes" in this case. 
const noteModel= mongoose.model("notes", noteSchema);

module.exports= noteModel;