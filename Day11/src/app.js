//iska kaam: server create krna and uska config krna

//note1
const express= require('express')
const app= express()
const authRouter= require('./routes/auth.routes')
const cookieParser= require('cookie-parser')

//yeh middleware hai jo json data ko parse krta hai
app.use(express.json()) 
app.use(cookieParser())

//note2
app.use("/api/auth", authRouter)


module.exports=app

//note1:since writing APIs in this file will make this file very complicated and difficult to maintain, we will create a separate file for APIs and import it here. Like- for authentication api: register we create a file named auth.routes.js and these api are also under a folder named routes
//note2:"/api/auth" yeh prefix hai jo authRouter me jitne bhi APIs honge unke aage lag jayega. Jaise- agar authRouter me register API hai to uska endpoint hoga "/api/auth/register"