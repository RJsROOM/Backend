//iska kaam: identify karna ki kis user ne request kri h wo nikal kr dede.
const jwt= require("jsonwebtoken")


async function identifyUser(req,res,next){
    const token= req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "token not found, unauthorised access"
        })
    }

    let decoded= null;
    
    try{
         decoded= jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "user not authorised"
        })
    }

    req.user= decoded;

    next();
}

module.exports= identifyUser;

/*
when working with middleware we created a new property called req.user and we set the identity recieved from the function into this new property. 
next() is a function which is used to pass the user identity data to the controllers. and this is the 3rd parameter we type in the function.
*/