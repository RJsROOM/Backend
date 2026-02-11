//iska kaam: server run krna and database se connect krke usko bi run krna

//yeh line .env file se environment variables ko load krne ke liye hai
require('dotenv').config() 
const mongoose= require('mongoose')
const connectToDb= require('./src/config/database')

const app= require('./src/app')


connectToDb()

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
