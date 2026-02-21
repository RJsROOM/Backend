const postModel= require("../models/post.model")
const ImageKit= require("@imagekit/nodejs")
const {toFile}= require("@imagekit/nodejs")
const jwt= require("jsonwebtoken")



const imagekit= new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res){



    const file= await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "Backend-insta_proj-posts"
    })

    const post= await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })

}

async function getPostController(req,res){

    

    const userId= req.user.id

    const posts= await postModel.find({
        user: userId,
    })
    res.status(200).json({
        message: "posts fetched successfully",
        posts
    })


}

async function getPostDetailsController(req,res){

    const userId= req.user.id
    const postId= req.params.postId

    const post= await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "no post with this post-id"
        })
    }

    //since our ids are stored as object ids and id from our DB is not in string format so we first convert our DB id into string and then check...the userId we get from decoded is already in string.
    const isValidUser= post.user.toString() === userId   

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden access request"
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post
    })

}




module.exports= {
    createPostController,
    getPostController,
    getPostDetailsController
}
/*
since in all the thrre of the controlllers we have created a check which checks for the token and the user...and repeating the codes makes our code unoptimized so to prevent it we use the middleares.
the middlewares are created in a separate folder named middlewares and under which we create our middleware files like for this "checking user" we have created "auth.middleware.js". 

now in place of decoded we can easily overwrite it with req.user because we havve assigned req.user the value of decoded in the middeware.

these middlewares are used in the routes file only for the easiness of understanding the flow of routes and APIs.
*/