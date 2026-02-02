// iska kaam: server ko run karta h and database se connect karna.

// cluster is nothing but a collection of storage with processor.

// mongoose is the package which helps us to connect our API with the mongodb server we created on the site.

//mongodb compass' connection string is already connected with the server's cluster but we have not yet created our db in the cluster so, mongoose.connect() helps us to connect our API with the cluster and also create a db in the cluster..like Day6 named db we created by just adding it in the connection string after '/' at last.

// since we do not know when our API builds connection with the server's database, so we run .then() so that whenever our API is connected we get a notification of it.

//note: whenever uploading on public profile, remember not to share the URI of compass..the db gets compromised and can be used by others which can hamper privacy.

const app= require("./src/app");
const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect("mongodb+srv://rakshitjha05_db_user:SeBlhsZgKUFSKiH6@cluster0.jetfkkr.mongodb.net/Day6").then(()=>{
        console.log("connected to Database")
    })
}
connectToDb();

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})