const mongoose= require("mongoose")


const noteSchema= new mongoose.Schema({
    title: String,
    description: String,
})


const noteModel= mongoose.model("notes", noteSchema)



module.exports=noteModel;

// for storing anything in DB, the db first asks us to give the type of data which we are going to store in it..that is, prior storing our data we need to first describe what kind of data we are going to store in our DB and this is called SCHEMA.

//the process of telling DB that what type of data should be stored in it is called SCHEMA creation and for this we create new folder named models where we write schemas.

//to perform CRUD(create,read,update,del) operations on database's data we use MODELS.

//"notes" below is the name of collection in which we are going to contain only data of noteSchema's data...in our db we can have multiple collections thus, collections are given names and performed like given down.