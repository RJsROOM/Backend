//iska kaam: database me operations control krna
const mongoose=require("mongoose")

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to database")
}

module.exports=connectToDb;