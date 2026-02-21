const express= require("express");
const userController= require("../controllers/user.controller")
const identifyUser= require("../middlewares/auth.middleware")

const userRouter=express.Router();


/*@route POST /api/users/follow/:userId
  @description: follow a user
  @access: private
  @middleware: identifyUser middleware gives us the info of who is the user in req.user
*/
userRouter.post("/follow/:username",identifyUser, userController.followUserController)


/*@route POST /api/users/unfollow/:userId
  @description: unfollow a user
  @access: private
  @middleware: identifyUser middleware gives us the info of who is the user in req.user
*/
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)





module.exports= userRouter;