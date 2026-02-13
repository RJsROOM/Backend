// iska kaam: server run karna or db me data save krna or token create krna
require('dotenv').config();
const app= require("./src/app")
const connectToDb= require("./src/config/database")

connectToDb();


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})