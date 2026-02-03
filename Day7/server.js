//iska kaam: ye server ko run karta and and database ko connect karta h

require("dotenv").config()
const app=require("./src/app")
const mongoose= require("mongoose")
const connectToDb= require("./src/config/database")

connectToDb()

app.listen(3000,()=>{
    console.log("server is running")
})



