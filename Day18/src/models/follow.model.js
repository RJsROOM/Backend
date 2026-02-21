const mongoose= require("mongoose");


const followSchema= new mongoose.Schema({
    //follower is someone who has follwed you
    follower: {
        type: String,
    },
    // followee is you 
    followee: {
        type: String,
    }
},{
    timestamps: true
})

followSchema.index({
    follower: 1,
    followee: 1
}, {
    unique: true
}
)

const  followModel= mongoose.model("follows", followSchema);

module.exports= followModel;


//timestamps: true tells us that when the document was created or updated last time