const express= require("express");
const postRouter= express.Router();
const postController= require("../controllers/post.controller")
const multer= require("multer")
const upload= multer({ storage: multer.memoryStorage()})


// POST /api/posts/ [protected:only the users with token can access this api]
postRouter.post("/",upload.single("frontendImg"), postController.createPostController) //frontendImg is the name of file which we recieve from the frontend(the name should be same as used in the frontend)





module.exports= postRouter
