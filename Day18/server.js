//iska kaam: server run karna or database se connect krna or env file se connect krna
require("dotenv").config();
const app= require("./src/app")
const connectToDb= require("./src/config/database")


connectToDb();

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})