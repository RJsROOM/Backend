const followModel= require("../models/follow.model");


async function followUserController(req,res){
    const followerUsername= req.user.username
    const followeeUsername= req.params.username

    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message: "You can't follow yourself"
        })
    }

    const isFolloweeExists= await followModel.findOne({
        username: followeeUsername
    })
    if(!isFolloweeExists){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isAlreadyFollowing= await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message: "You're already following this user",
            follow: isAlreadyFollowing
        })
    }

    const followRecord= await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You're now following ${followeeUsername}`,
        follow: followRecord
    })

}


async function unfollowUserController(req,res){
    const followeeUsername= req.params.username
    const followerUsername= req.user.username

    const isFollowing= await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(!isFollowing){
        return res.status(400).json({
            message: `you're not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id)

    res.status(200).json({
        message: `You've unfollowed ${followeeUsername}`
    })
}

module.exports= {
    followUserController,
    unfollowUserController

};