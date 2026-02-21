const express= require("express");
const postRouter= express.Router();
const postController= require("../controllers/post.controller")
const multer= require("multer")
const upload= multer({ storage: multer.memoryStorage()})
const identifyUser= require("../middlewares/auth.middleware")



// POST /api/posts/ [protected:only the users with token can access this api]
postRouter.post("/",upload.single("imgUrl"), identifyUser, postController.createPostController) //imgUrl is the name of file which we recieve from the frontend(the name should be same as used in the frontend)



// GET /api/posts/ [protected] : users can get all of their created posts from this api.
postRouter.get("/", identifyUser,  postController.getPostController)


// GET /api/posts/details/:postId
//return the details of the specific post with the given id and also check whether the request made by the user is the creator of the post or not. if not, then return "forbidden access"
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)





module.exports= postRouter
// identifyUser is the middleware which is used for checking the user's identity.
